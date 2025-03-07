package com.videohub.repositories.elasticRepositories;

import com.videohub.models.elasticModels.ElasticVideo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ElasticVideoRepository extends ElasticsearchRepository<ElasticVideo, String> {
    Page<ElasticVideo> findByName(String name, Pageable pageable);

    @Query("{\"multi_match\": {\"query\": \"?0\", \"fields\": [\"name\", \"fuzziness\": \"AUTO\"}}")
    Page<ElasticVideo> findFuzzyByName(String name, Pageable pageable);
}
