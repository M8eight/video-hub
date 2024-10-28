package com.videohub.controllers.videoControllers;

import com.videohub.models.Video;
import com.videohub.services.userServices.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favorites")
@CrossOrigin
public class FavoriteController {
    private final UserService userService;

    @GetMapping("/validate/{videoId}")
    public boolean isFavorite(@PathVariable Long videoId) {
        return userService.isFavorite(videoId);
    }

    @SneakyThrows
    @GetMapping("/get")
    public List<Video> getFavoriteVideos() {
        //todo сделать пагинацию
        return userService.getFavorite();
    }

    @PostMapping("/add/{videoId}")
    public boolean addVideo(@PathVariable Long videoId) {
        return userService.addFavorite(videoId);
    }

    @PostMapping("/remove/{videoId}")
    public boolean removeVideo(@PathVariable Long videoId) {
        return userService.removeFavorite(videoId);
    }
}
