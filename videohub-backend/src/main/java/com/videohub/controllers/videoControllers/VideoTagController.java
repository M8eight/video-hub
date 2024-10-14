package com.videohub.controllers.videoControllers;

import com.videohub.dtos.PaginationLimitBodyDto;
import com.videohub.models.VideoTag;
import com.videohub.services.videoServices.VideoTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/video/tag")
@CrossOrigin
public class VideoTagController {
    private final VideoTagService videoTagService;

    @GetMapping("/tags")
    public Page<VideoTag> getAllTagsEndpoint(PaginationLimitBodyDto requestParam) {
        return videoTagService.getTags(requestParam.getOffset(), requestParam.getLimit());
    }

    @PostMapping("/clicked/{id}")
    public void incrementClickedTagEndpoint(@PathVariable("id") Long id) {
        //todo use increment clicked
        videoTagService.incrementClicked(id);
    }
}
