package com.videohub.services;

import com.videohub.dtos.VideoDto;
import com.videohub.exceptions.VideoBadRequestException;
import com.videohub.helpers.FfmpegHelpers;
import com.videohub.helpers.FileStorageManager;
import com.videohub.interfaces.VideoDAO;
import com.videohub.models.Rating;
import com.videohub.models.Video;
import com.videohub.repositories.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VideoService implements VideoDAO {

    private final VideoRepository videoRepository;

    private final FileStorageManager fileStorageManager;

    private final FfmpegHelpers ffmpegHelpers;

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
    public void deleteById(Long id) {
        videoRepository.deleteById(id);
    }

    @Override
    public Video addVideo(VideoDto videoDto) {
        String extension = Objects.requireNonNull(videoDto.getVideoFile().getOriginalFilename())
                .substring(videoDto.getVideoFile().getOriginalFilename().lastIndexOf(".") + 1);

        if (!extension.equals("mp4") && !extension.equals("avi")) {
            throw new VideoBadRequestException(videoDto.getName());
        }

        String path = fileStorageManager.save(videoDto.getVideoFile());
        int durationSecond = ffmpegHelpers.getDuration(path);
        String previewPath = ffmpegHelpers.getImageFromVideo(path, durationSecond);

        return videoRepository.save(new Video(videoDto.getName(), videoDto.getDescription(), durationSecond, path, previewPath, new Rating()));
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
