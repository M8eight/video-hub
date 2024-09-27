package com.videohub.interfaces;

import com.videohub.models.VideoTag;
import org.springframework.data.domain.Page;


public interface VideoTagDao {
    Page<VideoTag> getTags(Integer offset, Integer limit);
    void incrementClicked(Long id);
}
