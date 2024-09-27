package com.videohub.controllers;

import com.videohub.dtos.PaginationLimitBodyDto;
import com.videohub.dtos.VideoDto;
import com.videohub.dtos.VideoFilterCriteriaDto;
import com.videohub.enumerations.SortVideosBy;
import com.videohub.exceptions.VideoNotFoundException;
import com.videohub.models.Video;
import com.videohub.models.elasticModels.ElasticVideo;
import com.videohub.services.ElasticVideoService;
import com.videohub.services.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("api")
@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class VideoController {

    private final VideoService videoService;
    private final ElasticVideoService elasticVideoService;

    @GetMapping("/videos")
    Page<Video> allVideosEndpoint(VideoFilterCriteriaDto videosDto) {
        return videoService.getVideosWithFilter(videosDto);
    }

    @PostMapping("/videos")
    Page<Video> allVideosFiltersEndpoint(@RequestBody VideoFilterCriteriaDto videosDto) {
        return videoService.getVideosWithFilter(videosDto);
    }

    @Deprecated
    @PostMapping("/video/search")
    Page<ElasticVideo> findByNameEndpoint(@RequestBody Map<String, String> req) {
//        log.info(name);
        return elasticVideoService.findByName(req.get("name"));
    }

    @PostMapping("/video")
    Video newVideoEndpoint(@ModelAttribute VideoDto videoDto) {
        return videoService.addVideo(videoDto);
    }

    @GetMapping("/video/{id}")
    Video oneVideoEndpoint(@PathVariable Long id) {
        return videoService.getById(id).orElseThrow(() -> new VideoNotFoundException(id));
    }

    //    todo сделать изменение
    @PutMapping("/video/{id}/edit")
    Video editVideoEndpoint(@PathVariable Long id, @ModelAttribute VideoDto videoDto) {
        return videoService.editVideo(id, videoDto);
    }

    @DeleteMapping("/video/{id}")
    void deleteVideoEndpoint(@PathVariable Long id) {
        videoService.deleteById(id);
    }
}
