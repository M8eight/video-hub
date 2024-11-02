package com.videohub.controllers.videoControllers;

import com.videohub.dtos.videoDtos.EditVideoDto;
import com.videohub.dtos.videoDtos.VideoDto;
import com.videohub.dtos.videoDtos.VideoFilterCriteriaDto;
import com.videohub.exceptions.videoExceptions.VideoNotFoundException;
import com.videohub.models.Video;
import com.videohub.models.elasticModels.ElasticVideo;
import com.videohub.services.elasticsearchServices.ElasticVideoService;
import com.videohub.services.videoServices.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

    //todo сделать изменение
    @PutMapping("/video/edit")
    Video editVideoEndpoint(@ModelAttribute EditVideoDto editVideoDto) {
        return videoService.editVideo(editVideoDto);
    }

    @DeleteMapping("/video/{id}")
    void deleteVideoEndpoint(@PathVariable Long id) {
        videoService.deleteById(id);
    }
}
