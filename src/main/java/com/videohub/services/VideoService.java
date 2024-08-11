package com.videohub.services;

import com.videohub.daos.VideoForm;
import com.videohub.exceptions.VideoBadRequestException;
import com.videohub.helpers.FfmpegHelpers;
import com.videohub.helpers.FileStorageManager;
import com.videohub.interfaces.VideoDAO;
import com.videohub.models.Rating;
import com.videohub.models.Video;
import com.videohub.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class VideoService implements VideoDAO {
    private final VideoRepository videoRepository;

    private final FileStorageManager fileStorageManager;

    private final FfmpegHelpers ffmpegHelpers;

    @Autowired
    public VideoService(VideoRepository videoRepository, FileStorageManager fileStorageManager, FfmpegHelpers ffmpegHelpers) {
        this.videoRepository = videoRepository;
        this.fileStorageManager = fileStorageManager;
        this.ffmpegHelpers = ffmpegHelpers;
    }

    @Override
    public Optional<Video> getById(Long id) {
        return videoRepository.findById(id);
    }

    @Override
    public Optional<Video> getRefById(Long id) {
        return Optional.of(videoRepository.getReferenceById(id));
    }

    @Override
    public List<Video> getAll() {
        return videoRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        videoRepository.deleteById(id);
    }

    @Override
    public Video addVideo(VideoForm videoForm) {
        String extension = Objects.requireNonNull(videoForm.getVideoFile().getOriginalFilename())
                .substring(videoForm.getVideoFile().getOriginalFilename().lastIndexOf(".") + 1);

        if (!extension.equals("mp4") && !extension.equals("avi")) {
            throw new VideoBadRequestException(videoForm.getName());
        }

        String path = fileStorageManager.save(videoForm.getVideoFile());
        int durationSecond = ffmpegHelpers.getDuration(path);
        String previewPath = ffmpegHelpers.getImageFromVideo(path, durationSecond);

        return videoRepository.save(new Video(videoForm.getName(), videoForm.getDescription(), durationSecond, path, previewPath, new Rating()));
        //todo сделать авторизацию
        //todo админка
    }

    @Override
    public Video editVideo(Long id, VideoForm videoForm) {
        Video video = videoRepository.findById(id).orElseThrow();

        video.setName(videoForm.getName());
        video.setDescription(videoForm.getDescription());
        return videoRepository.save(video);
    }
}
