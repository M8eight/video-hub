package com.videohub.services.videoServices;

import com.videohub.interfaces.VideoTagDao;
import com.videohub.models.VideoTag;
import com.videohub.repositories.videoRepositories.VideoTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VideoTagService implements VideoTagDao {
    private final VideoTagRepository videoTagRepository;

    @Override
    public Page<VideoTag> getTags(Integer offset, Integer limit) {
        return videoTagRepository.findAll(PageRequest.of(offset, limit));
    }

    @Override
    public void incrementClicked(Long id) {
        VideoTag videoTag = videoTagRepository.findById(id).orElseThrow();
        videoTag.setClicked(videoTag.getClicked() + 1);
        videoTagRepository.save(videoTag);
    }


}
