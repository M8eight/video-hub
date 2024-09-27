package com.videohub.interfaces;

import com.videohub.dtos.VideoDto;
import com.videohub.dtos.VideoFilterCriteriaDto;
import com.videohub.enumerations.SortVideosBy;
import com.videohub.models.Video;
import com.videohub.models.elasticModels.ElasticVideo;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface VideoDAO {
    Optional<Video> getById(Long id);
    Optional<Video> getRefById(Long id);
    Page<Video> getVideosWithFilter(VideoFilterCriteriaDto videoDto);
    void deleteById(Long id);
    Video addVideo(VideoDto videoDto);
    Video editVideo(Long id, VideoDto videoDto);
}
