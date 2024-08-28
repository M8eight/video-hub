package com.videohub.interfaces;

import com.videohub.dtos.VideoDto;
import com.videohub.models.Video;

import java.util.List;
import java.util.Optional;

public interface VideoDAO {
    Optional<Video> getById(Long id);
    Optional<Video> getRefById(Long id);
    List<Video> getAll();
    void deleteById(Long id);
    Video addVideo(VideoDto videoDto);
    Video editVideo(Long id, VideoDto videoDto);
}
