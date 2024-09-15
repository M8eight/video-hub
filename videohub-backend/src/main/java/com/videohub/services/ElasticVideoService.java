package com.videohub.services;

import com.videohub.models.elasticModels.ElasticVideo;
import com.videohub.repositories.elasticRepositories.ElasticVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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

    public Page<ElasticVideo> findByName(String name) {
        return elasticVideoRepository.findByName(name, PageRequest.of(0, 10));
    }


}
