package com.videohub.repositories.videoRepositories;

import com.videohub.models.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video,Long>, JpaSpecificationExecutor<Video> {

    @Query("SELECT COUNT(v) FROM Video v")
    long countVideo();

    @Modifying
    @Query("UPDATE Video v SET v.views = (v.views + 1) WHERE v.id = :vidId")
    void incrementViews(@Param("vidId") Long vidId);

    @Query(value = "select * from videos where name_tsvector_ru || ' ' || description_tsvector_ru @@ plainto_tsquery('russian', :query)", nativeQuery = true)
    Page<Video> searchByNameAndDescription(@Param("query") String query, Pageable pageable);

}
