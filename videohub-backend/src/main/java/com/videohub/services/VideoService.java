package com.videohub.services;

import com.videohub.dtos.VideoDto;
import com.videohub.dtos.VideoFilterCriteriaDto;
import com.videohub.enumerations.SortVideosBy;
import com.videohub.exceptions.VideoBadRequestException;
import com.videohub.filters.VideoSpecification;
import com.videohub.helpers.FfmpegHelpers;
import com.videohub.helpers.FileStorageManager;
import com.videohub.helpers.SaveFileType;
import com.videohub.interfaces.VideoDAO;
import com.videohub.mappers.ElasticVideoMapper;
import com.videohub.models.Rating;
import com.videohub.models.User;
import com.videohub.models.Video;
import com.videohub.models.VideoTag;
import com.videohub.repositories.UserRepository;
import com.videohub.repositories.VideoRepository;
import com.videohub.repositories.VideoTagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoService implements VideoDAO {
    private final VideoRepository videoRepository;
    private final FileStorageManager fileStorageManager;
    private final FfmpegHelpers ffmpegHelpers;
    private final ElasticVideoService elasticVideoService;
    private final ElasticVideoMapper elasticVideoMapper;
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

    @Override
    public Page<Video> getVideosWithFilter(VideoFilterCriteriaDto videoDto) {
        int offset = videoDto.getOffset();
        int limit = videoDto.getLimit();
        List<String> tags = videoDto.getTags();

        Specification<Video> specification = VideoSpecification.hasManyTags(tags);

        Specification<Video> sortSpecification = null;

        switch (SortVideosBy.valueOf(videoDto.getSortBy().toUpperCase())) {
            case NEW -> {}
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
        assert videoDto.getVideoFile() != null;
        String extension = Objects.requireNonNull(videoDto.getVideoFile().getOriginalFilename())
                .substring(videoDto.getVideoFile().getOriginalFilename().lastIndexOf(".") + 1);

        if (!extension.equals("mp4") && !extension.equals("avi")) {
            throw new VideoBadRequestException(videoDto.getName());
        }

        //Save video and get duration
        String videoPath = fileStorageManager.save(videoDto.getVideoFile(), SaveFileType.VIDEO);
        int durationSecond = ffmpegHelpers.getDuration(videoPath);
        String previewPath = ffmpegHelpers.getImageFromVideo(videoPath, durationSecond);

        ffmpegHelpers.createVideoCutPreview(videoPath, durationSecond);

        //Set user
        Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
        User user = null;
        if (authContext != null && authContext.isAuthenticated()) {
            user = userRepository.findUserByLogin(((UserDetails) authContext.getPrincipal()).getUsername()).orElseThrow();
        }

        //Set tags
        List<VideoTag> videoTagList = new ArrayList<>();
        if (videoDto.getVideoTags() != null) {
            for (String el : videoDto.getVideoTags()) {
                videoTagList.add(videoTagRepository.findByText(el).orElseGet(() ->
                        videoTagRepository.save(new VideoTag(el)))
                );
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
        elasticVideoService.save(elasticVideoMapper.toElasticVideo(newVideo));

        return newVideo;
    }

    @Override
    public Video editVideo(Long id, VideoDto videoDto) {
        Video video = videoRepository.findById(id).orElseThrow();
        video.setName(videoDto.getName());
        video.setDescription(videoDto.getDescription());

        return videoRepository.save(video);
    }
}
