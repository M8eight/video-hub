package com.videohub.controllers;

import com.videohub.models.Video;
import com.videohub.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Controller
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favorites")
@CrossOrigin
public class FavoriteController {
    private final UserService userService;

    @SneakyThrows
    @GetMapping("/get")
    public List<Video> getFavoriteVideos() {
        //todo сделать пагинацию
        return userService.getFavoriteVideos();
    }

    @PostMapping("/add/{videoId}")
    public List<Video> addVideo(@PathVariable Long videoId) {
        return userService.addFavoriteVideo(videoId);
    }

    @PostMapping("/remove/{videoId}")
    public List<Video> removeVideo(@PathVariable Long videoId) {
        return userService.removeFavoriteVideo(videoId);
    }
}
