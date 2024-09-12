package com.videohub.interfaces;

import com.videohub.dtos.VideoDto;
import com.videohub.models.Video;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface VideoDAO {
    Optional<Video> getById(Long id);
    Optional<Video> getRefById(Long id);
    Page<Video> getAll(Integer offset, Integer limit);
    Page<Video> getWithSortBy(Integer offset, Integer limit, String sortBy);
    void deleteById(Long id);
    Video addVideo(VideoDto videoDto);
    Video editVideo(Long id, VideoDto videoDto);
}
