package com.videohub.services.videoServices;

import com.videohub.dtos.videoDtos.EditVideoDto;
import com.videohub.dtos.videoDtos.VideoDto;
import com.videohub.dtos.videoDtos.VideoFilterCriteriaDto;
import com.videohub.enumerations.SortVideosBy;
import com.videohub.exceptions.videoExceptions.VideoBadRequestException;
import com.videohub.filters.VideoSpecification;
import com.videohub.helpers.FfmpegHelpers;
import com.videohub.helpers.FileStorageManager;
import com.videohub.helpers.StorageFileType;
import com.videohub.interfaces.VideoDAO;
import com.videohub.models.Rating;
import com.videohub.models.User;
import com.videohub.models.Video;
import com.videohub.models.VideoTag;
import com.videohub.repositories.userRepositories.UserRepository;
import com.videohub.repositories.videoRepositories.VideoRepository;
import com.videohub.repositories.videoRepositories.VideoTagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoService implements VideoDAO {
    private final VideoRepository videoRepository;
    private final FileStorageManager fileStorageManager;
    private final FfmpegHelpers ffmpegHelpers;
    private final UserRepository userRepository;
    private final VideoTagRepository videoTagRepository;

    @Override
    @Transactional
    public Optional<Video> getById(Long id) {
        videoRepository.incrementViews(id);
        return videoRepository.findById(id);
    }

    @Override
    public Optional<Video> getRefById(Long id) {
        return Optional.of(videoRepository.getReferenceById(id));
    }

    @Transactional
    public Page<Video> searchByNameAndDescription(String search, Pageable pageable) {
        return videoRepository.searchByNameAndDescription(search, pageable);
    }

    @Override
    public Page<Video> getVideosWithFilter(VideoFilterCriteriaDto videoDto) {
        int offset = videoDto.getOffset();
        int limit = videoDto.getLimit();
        List<String> tags = videoDto.getTags();

        Specification<Video> specification = VideoSpecification.hasManyTags(tags);

        Specification<Video> sortSpecification = null;

        switch (SortVideosBy.valueOf(videoDto.getSortBy().toUpperCase())) {
            case NEW -> {
            }
            case OLD -> sortSpecification = VideoSpecification.sortByCreated_atDesc();
            case RATING -> sortSpecification = VideoSpecification.sortByRating();
            case VIEWS -> sortSpecification = VideoSpecification.sortByViews();
        }

        return videoRepository.findAll(specification.and(sortSpecification), PageRequest.of(offset, limit));
    }

    @Override
    public void deleteById(Long id) {
        videoRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Video addVideo(VideoDto videoDto) {
        log.info("addVideo {}", videoDto);
        assert videoDto.getVideoFile() != null;
        String extension = Objects.requireNonNull(videoDto.getVideoFile().getOriginalFilename())
                .substring(videoDto.getVideoFile().getOriginalFilename().lastIndexOf(".") + 1);

        if (!extension.equals("mp4") && !extension.equals("avi")) {
            throw new VideoBadRequestException(videoDto.getName());
        }

        log.info("ffmpeg stage");
        //Save video and get duration
        String videoPath = fileStorageManager.save(videoDto.getVideoFile(), StorageFileType.VIDEO);
        log.info(videoPath);
        int durationSecond = ffmpegHelpers.getDuration(videoPath);
        log.info(durationSecond + " s");
        String previewPath = ffmpegHelpers.getImageFromVideo(videoPath, durationSecond);
        log.info(previewPath);

        log.info("create video cut preview");
        ffmpegHelpers.createVideoCutPreview(videoPath, durationSecond);

        //Set user
        Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
        User user = null;
        if (authContext != null && authContext.isAuthenticated()) {
            user = userRepository.findUserByLogin(((UserDetails) authContext.getPrincipal()).getUsername()).orElseThrow();
        }

        //Set tags
        Set<VideoTag> videoTagList = new HashSet<>();
        if (videoDto.getVideoTags() != null) {
            for (String el : videoDto.getVideoTags()) {
                videoTagList.add(videoTagRepository.findByText(el).orElseGet(() -> videoTagRepository.save(new VideoTag(el))));
            }
        }

        Video newVideo = videoRepository.save(new Video(
                videoDto.getName(),
                videoDto.getDescription(),
                durationSecond,
                videoTagList,
                videoPath,
                previewPath,
                user,
                new Rating()
        ));
        log.info("save elastic video ");

        return newVideo;
    }


    @Override
    @Transactional
    public Video editVideo(EditVideoDto editVideoDto) {
        Video video = videoRepository.findById(editVideoDto.getId()).orElseThrow();

        if (editVideoDto.getName() == null || editVideoDto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Video name cannot be empty");
        }

        video.setName(editVideoDto.getName().trim());
        video.setDescription(editVideoDto.getDescription().trim());
        if (editVideoDto.getVideoTags() != null) {
            Set<VideoTag> videoTagList = new HashSet<>();
            for (String el : editVideoDto.getVideoTags()) {
                videoTagList.add(videoTagRepository.findByText(el).orElseGet(() -> videoTagRepository.save(new VideoTag(el))));
            }
            videoTagList.addAll(video.getTags());
            video.setTags(videoTagList);
        }

        String transientPreviewPath = video.getPreview_path();
        if (editVideoDto.getPreviewFile() != null) {
            MultipartFile previewFile = editVideoDto.getPreviewFile();
            transientPreviewPath = fileStorageManager.save(previewFile, StorageFileType.PICTURE);
            fileStorageManager.delete(video.getPreview_path(), StorageFileType.PICTURE);
        }

        video.setPreview_path(transientPreviewPath);
        log.info("transient {}", transientPreviewPath);

        return videoRepository.save(video);
    }
}
