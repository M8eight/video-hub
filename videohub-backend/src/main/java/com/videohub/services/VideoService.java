package com.videohub.services;

import com.videohub.dtos.VideoDto;
import com.videohub.exceptions.VideoBadRequestException;
import com.videohub.helpers.FfmpegHelpers;
import com.videohub.helpers.FileStorageManager;
import com.videohub.interfaces.VideoDAO;
import com.videohub.mappers.ElasticVideoMapper;
import com.videohub.models.Rating;
import com.videohub.models.Video;
import com.videohub.models.elasticModels.ElasticVideo;
import com.videohub.repositories.VideoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

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

    @Override
    public Optional<Video> getById(Long id) {
        return videoRepository.findById(id);
    }

    @Override
    public Optional<Video> getRefById(Long id) {
        return Optional.of(videoRepository.getReferenceById(id));
    }

    @Override
    public Page<Video> getAll(Integer offset, Integer limit) {
        return videoRepository.findAllVideos(PageRequest.of(offset, limit));
    }

    @Override
    public Page<Video> getWithSortBy(Integer offset, Integer limit, String sortBy) {
        Page<Video> resultVideos;
        if ("views".equals(sortBy)) {
            resultVideos = videoRepository.findAllByViews(PageRequest.of(offset, limit));
        } else {
            resultVideos = videoRepository.findAllVideos(PageRequest.of(offset, limit));
        }

        return resultVideos;
    }

    @Override
    public void deleteById(Long id) {
        videoRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Video addVideo(VideoDto videoDto) {
        String extension = Objects.requireNonNull(videoDto.getVideoFile().getOriginalFilename())
                .substring(videoDto.getVideoFile().getOriginalFilename().lastIndexOf(".") + 1);

        if (!extension.equals("mp4") && !extension.equals("avi")) {
            throw new VideoBadRequestException(videoDto.getName());
        }

        String path = fileStorageManager.save(videoDto.getVideoFile());
        log.info("path {}", path);
        int durationSecond = ffmpegHelpers.getDuration(path);
        String previewPath = ffmpegHelpers.getImageFromVideo(path, durationSecond);

        Video newVideo = videoRepository.save(new Video(videoDto.getName(), videoDto.getDescription(), durationSecond, path, previewPath, new Rating()));

        elasticVideoService.save(elasticVideoMapper.toElasticVideo(newVideo));

        return newVideo;
        //todo сделать авторизацию
        //todo админка
    }

    @Override
    public Video editVideo(Long id, VideoDto videoDto) {
        Video video = videoRepository.findById(id).orElseThrow();

        video.setName(videoDto.getName());
        video.setDescription(videoDto.getDescription());
        return videoRepository.save(video);
    }
}
