package com.videohub.services;

import com.videohub.exceptions.videoExceptions.VideoNotFoundException;
import com.videohub.helpers.AuthHelper;
import com.videohub.interfaces.CommentDAO;
import com.videohub.models.Comment;
import com.videohub.models.Rating;
import com.videohub.repositories.videoRepositories.CommentRepository;
import com.videohub.repositories.videoRepositories.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService implements CommentDAO {
    final private AuthHelper authHelper;
    final private CommentRepository commentRepository;
    final private VideoRepository videoRepository;

    @Override
    public List<Comment> getComments(Long videoId) {
        return videoRepository.findById(videoId).orElseThrow(() -> new VideoNotFoundException(videoId)).getComments();
    }

    @Override
    public Comment createComment(Long videoId, String text) {
        return commentRepository.save(Comment.builder()
                .text(text)
                .user(null)
                .video(videoRepository.findById(videoId).orElseThrow(() -> new VideoNotFoundException(videoId)))
                .user(authHelper.getUserFromAuth())
                .rating(new Rating())
                .build());
    }

    @Override
    public Comment editComment(Long commentId, String text) {
        Comment comment = commentRepository.findById(commentId).orElseThrow();
        comment.setText(text);
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId) {
        videoRepository.deleteById(commentId);
    }
}
