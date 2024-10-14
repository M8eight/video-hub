package com.videohub.interfaces;

import com.videohub.dtos.videoDtos.EditVideoDto;
import com.videohub.dtos.videoDtos.VideoDto;
import com.videohub.dtos.videoDtos.VideoFilterCriteriaDto;
import com.videohub.models.Video;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface VideoDAO {
    Optional<Video> getById(Long id);
    Optional<Video> getRefById(Long id);
    Page<Video> getVideosWithFilter(VideoFilterCriteriaDto videoDto);
    void deleteById(Long id);
    Video addVideo(VideoDto videoDto);
    Video editVideo(EditVideoDto editVideoDto);
}
