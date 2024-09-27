package com.videohub.repositories;

import com.videohub.models.VideoTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoTagRepository extends JpaRepository<VideoTag, Long> {
    Optional<VideoTag> findByText(String text);
}
