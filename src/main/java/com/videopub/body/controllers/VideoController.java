package com.videopub.body.controllers;


import com.videopub.body.exceptions.VideoNotFoundException;
import com.videopub.body.helpers.FileStorageManager;
import com.videopub.body.models.Video;
import com.videopub.body.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api")
public class VideoController {
    private final VideoRepository videoRepository;
    private final FileStorageManager fileStorageManager;

    @Autowired
    public VideoController(VideoRepository videoRepository, FileStorageManager fileStorageManager) {
        this.videoRepository = videoRepository;
        this.fileStorageManager = fileStorageManager;
    }

    @GetMapping("/videos")
    @CrossOrigin
    List<Video> all() {
        return videoRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/video")
    Video newvideo(@RequestParam String name, @RequestParam int duration, @RequestParam MultipartFile file) {
        Video video = new Video();
        video.setName(name);
        video.setDuration(duration);
        String path = fileStorageManager.save(file);
        video.setVideo_path(path);
        return videoRepository.save(video);
    }

    @GetMapping("/video/{id}")
    Video onevideo(@PathVariable Long id) {
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
