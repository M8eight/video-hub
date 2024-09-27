package com.videohub.controllers;

import com.videohub.exceptions.VideoNotFoundException;
import com.videohub.models.Comment;
import com.videohub.models.Rating;
import com.videohub.repositories.CommentRepository;
import com.videohub.repositories.VideoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class CommentController {
    final private CommentRepository commentRepository;
    final private VideoRepository videoRepository;
    @GetMapping("/video/{id}/comments")
    public List<Comment> getCommentsEndpoint(@PathVariable Long id) {
        return videoRepository.findById(id).orElseThrow(() -> new VideoNotFoundException(id)).getComments();
    }

    @PostMapping("/video/{id}/comment/new")
    public ResponseEntity<HttpStatusCode> newCommentEndpoint(@PathVariable Long id, @Valid @RequestBody Comment comment) {
        comment.setRating(new Rating());
        comment.setVideo(videoRepository.getReferenceById(id));
        commentRepository.save(comment);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/video/{id}/comment/edit")
    public Comment editCommentEndpoint(@PathVariable Long id, @RequestParam String text) {
        Comment comment = commentRepository.getReferenceById(id);
        comment.setText(text);
        return commentRepository.save(comment);
    }

    @DeleteMapping("/video/{id}/comment/delete")
    public void deleteCommentEndpoint(@PathVariable Long id) {
        commentRepository.deleteById(id);
    }
}
