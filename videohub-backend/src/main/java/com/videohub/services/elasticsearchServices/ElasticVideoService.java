package com.videohub.services.elasticsearchServices;

import com.videohub.models.elasticModels.ElasticVideo;
import com.videohub.repositories.elasticRepositories.ElasticVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ElasticVideoService {
    final private ElasticVideoRepository elasticVideoRepository;

    @Autowired
    public ElasticVideoService(ElasticVideoRepository elasticVideoRepository) {
        this.elasticVideoRepository = elasticVideoRepository;
    }

    public void save(ElasticVideo video) {
        elasticVideoRepository.save(video);
    }

    public void deleteVideo(String videoId) {
        elasticVideoRepository.deleteById(videoId);
    }

    public Page<ElasticVideo> findByName(String name) {
        return elasticVideoRepository.findFuzzyByName(name, PageRequest.of(0, 10));
    }


}
