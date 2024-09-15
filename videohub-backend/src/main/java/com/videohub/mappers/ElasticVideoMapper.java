package com.videohub.mappers;

import com.videohub.models.Video;
import com.videohub.models.elasticModels.ElasticVideo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ElasticVideoMapper {
    @Mapping(target = "relation_id", source = "id")
    ElasticVideo toElasticVideo(Video video);
}
