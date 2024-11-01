package com.videohub.interfaces;

import com.videohub.models.Comment;

import java.util.List;

public interface CommentDAO {
    List<Comment> getComments(Long videoId);
    Comment createComment(Long videoId, String text);
    Comment editComment(Long commentId, String text);
    void deleteComment(Long commentId);
}
