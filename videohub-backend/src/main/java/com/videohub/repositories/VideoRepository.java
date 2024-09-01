package com.videohub.repositories;

import com.videohub.models.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends JpaRepository<Video,Long> {
    @Query("select a from Video a")
    Page<Video> findAllVideos(Pageable pageable);
}
