package com.videohub.controllers;

import com.videohub.exceptions.VideoBadRequestException;
import com.videohub.exceptions.VideoNotFoundException;
import com.videohub.helpers.FileStorageManager;
import com.videohub.helpers.GetImageFromVideo;
import com.videohub.helpers.GetVideoDuration;
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
        return videoRepository.save(video);
    }

    @GetMapping("/video/{id}")
    @CrossOrigin
    Video oneVideo(@PathVariable Long id) {
        return videoRepository.findById(id).orElseThrow(() -> new VideoNotFoundException(id));
    }

//    @PutMapping("/video/{id}")
//    Video editvideo(@PathVariable Long id) {
//        return videoRepository.findById(id).map( (video) -> {
//            video.setName(newvideo.getName());
//            video.setDuration(newvideo.getDuration());
//            return videoRepository.save(video);
//        }).orElseGet(() -> {
//            return videoRepository.save(newvideo);
//        });
//    }

    @DeleteMapping("/video/{id}")
    void deletevideo(@PathVariable Long id) {
        videoRepository.deleteById(id);
    }

}
