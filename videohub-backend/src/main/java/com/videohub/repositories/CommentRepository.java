package com.videohub.repositories;

import com.videohub.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    @Query("SELECT COUNT(c) FROM Comment c")
    long countComment();
}
