package com.videohub.repositories;

import com.videohub.models.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepository extends JpaRepository<Video,Long> {
    @Query("SELECT COUNT(v) FROM Video v")
    long countVideo();
    @Modifying
    @Query("UPDATE Video v SET v.views = (v.views + 1) WHERE v.id = :vidId")
    void incrementViews(@Param("vidId") Long vidId);
    @Query("select a from Video a")
    Page<Video> findAllVideos(Pageable pageable);
    @Query("select a from Video a order by a.views desc")
    Page<Video> findAllByViews(Pageable pageable);
}
