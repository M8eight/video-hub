package com.videohub.controllers;

import com.videohub.dtos.PaginationLimitBodyDto;
import com.videohub.dtos.VideoDto;
import com.videohub.exceptions.VideoNotFoundException;
import com.videohub.models.Video;
import com.videohub.services.VideoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RequestMapping("api")
@RestController
@RequiredArgsConstructor
@Slf4j
public class VideoController {

    private final VideoService videoService;

    //            @RequestParam(defaultValue = "0", value = "offset") @Min(0) Integer offset,
//            @RequestParam(defaultValue = "20", value = "limit") @Min(2) @Max(100) Integer limit
    @GetMapping("/videos")
    @CrossOrigin
    Page<Video> all(PaginationLimitBodyDto requestParam, @RequestParam(defaultValue = "") String sortBy) {
        return videoService.getWithSortBy(requestParam.getOffset(), requestParam.getLimit(), sortBy);
    }

//    @GetMapping("/videos")
//    @CrossOrigin
//    Page<Video> all(PaginationLimitBodyDto requestParam, @RequestParam String sortBy) {
//        return videoService.getWithSortBy(requestParam.getOffset(), requestParam.getLimit(), sortBy);
//    }

    @CrossOrigin
    @PostMapping("/video")
    Video newVideo(@ModelAttribute VideoDto videoDto) {
        return videoService.addVideo(videoDto);
    }

    @GetMapping("/video/{id}")
    @CrossOrigin
    Video oneVideo(@PathVariable Long id) {
        return videoService.getById(id).orElseThrow(() -> new VideoNotFoundException(id));
    }

    //    todo сделать изменение
    @PutMapping("/video/{id}/edit")
    @CrossOrigin
    Video editVideo(@PathVariable Long id, @ModelAttribute VideoDto videoDto) {
        return videoService.editVideo(id, videoDto);
    }

    @DeleteMapping("/video/{id}")
    void deleteVideo(@PathVariable Long id) {
        videoService.deleteById(id);
    }
}
