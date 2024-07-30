package com.videohub.controllers;

import com.videohub.exceptions.VideoBadRequestException;
import com.videohub.exceptions.VideoNotFoundException;
import com.videohub.helpers.FileStorageManager;
import com.videohub.helpers.GetImageFromVideo;
import com.videohub.helpers.GetVideoDuration;
import com.videohub.models.Rating;
import com.videohub.models.Video;
import com.videohub.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@RequestMapping("api")
@RestController
public class VideoController {
    private final VideoRepository videoRepository;
    private final FileStorageManager fileStorageManager;
    private final GetVideoDuration getVideoDuration;
    private final GetImageFromVideo getImageFromVideo;

    @Autowired
    public VideoController(VideoRepository videoRepository, FileStorageManager fileStorageManager, GetVideoDuration getVideoDuration, GetImageFromVideo getImageFromVideo) {
        this.videoRepository = videoRepository;
        this.fileStorageManager = fileStorageManager;
        this.getVideoDuration = getVideoDuration;
        this.getImageFromVideo = getImageFromVideo;
    }

    @GetMapping("/videos")
    @CrossOrigin
    List<Video> all() {
        return videoRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/video")
    Video newVideo(@RequestParam String name, @RequestParam String description, @RequestParam MultipartFile videoFile) {
        String extension = Objects.requireNonNull(videoFile.getOriginalFilename()).substring(videoFile.getOriginalFilename().lastIndexOf(".")+1);

        if (!extension.equals("mp4") && !extension.equals("avi")) {
            throw new VideoBadRequestException(name);
        }

        String path = fileStorageManager.save(videoFile);
        int durationSecond = getVideoDuration.getDuration(path);
        String previewPath = getImageFromVideo.getImageFromVideo(path, durationSecond);

        Video video = new Video();
        video.setName(name);
        video.setDescription(description);
        video.setVideo_path(path);
        video.setDuration(durationSecond);
        video.setPreview_path(previewPath);
        video.setRating(new Rating());
        return videoRepository.save(video);
        //todo сделать csrf и всякую защиту
        //todo сделать авторизацию
        //todo админка
    }

    @GetMapping("/video/{id}")
    @CrossOrigin
    Video oneVideo(@PathVariable Long id) {
        return videoRepository.findById(id).orElseThrow(() -> new VideoNotFoundException(id));
    }

//    todo сделать изменение
    @PutMapping("/video/{id}/edit")
    @CrossOrigin
    Video editVideo(@PathVariable Long id, @RequestParam String name, @RequestParam String description, @RequestParam MultipartFile videoFile) {

        Video video = videoRepository.getReferenceById(id);
        String previewPath, path = "";
        int durationSecond = 0;

        if (videoFile != null) {
            String extension = videoFile.getOriginalFilename().substring(videoFile.getOriginalFilename().lastIndexOf(".")+1);
            if (!extension.equals("mp4") && !extension.equals("avi")) {
                throw new VideoBadRequestException(name);
            }
            path = fileStorageManager.save(videoFile);
            durationSecond = getVideoDuration.getDuration(path);
            previewPath = getImageFromVideo.getImageFromVideo(path, durationSecond);
        } else {
            previewPath = video.getPreview_path();
            path = video.getVideo_path();
            durationSecond = video.getDuration();
        }

        if (name != null) {
            video.setName(name);
        }
        if (description != null) {
            video.setDescription(description);
        }
        video.setVideo_path(path);
        video.setDuration(durationSecond);
        video.setPreview_path(previewPath);
        video.setRating(video.getRating());
        return videoRepository.save(video);
    }

    @DeleteMapping("/video/{id}")
    void deleteVideo(@PathVariable Long id) {
        videoRepository.deleteById(id);
    }

}
