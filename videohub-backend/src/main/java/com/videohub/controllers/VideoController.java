package com.videohub.controllers;

import com.videohub.daos.VideoForm;
import com.videohub.exceptions.VideoNotFoundException;
import com.videohub.models.Video;
import com.videohub.services.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
@RestController
@RequiredArgsConstructor
public class VideoController {
    
    private final VideoService videoService;

    @GetMapping("/videos")
    @CrossOrigin
    List<Video> all() {
        return videoService.getAll();
    }

    @CrossOrigin
    @PostMapping("/video")
    Video newVideo(@ModelAttribute VideoForm videoForm) {
        return videoService.addVideo(videoForm);
    }

    @GetMapping("/video/{id}")
    @CrossOrigin
    Video oneVideo(@PathVariable Long id) {
        return videoService.getById(id).orElseThrow(() -> new VideoNotFoundException(id));
    }

    //    todo сделать изменение
    @PutMapping("/video/{id}/edit")
    @CrossOrigin
    Video editVideo(@PathVariable Long id, @ModelAttribute VideoForm videoForm) {
        return videoService.editVideo(id, videoForm);
    }

    @DeleteMapping("/video/{id}")
    void deleteVideo(@PathVariable Long id) {
        videoService.deleteById(id);
    }
}
