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
public class CommentController {
    CommentRepository commentRepository;
    VideoRepository videoRepository;
    @CrossOrigin
    @GetMapping("/video/{id}/comments")
    public List<Comment> getComments(@PathVariable Long id) {
        return videoRepository.findById(id).orElseThrow(() -> new VideoNotFoundException(id)).getComments();
    }

    @CrossOrigin
    @PostMapping("/video/{id}/comment/new")
    public ResponseEntity<HttpStatusCode>  newComment(@PathVariable Long id, @Valid @RequestBody Comment comment) {
        comment.setRating(new Rating());
        comment.setVideo(videoRepository.getReferenceById(id));
        commentRepository.save(comment);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @CrossOrigin
    @PutMapping("/video/{id}/comment/edit")
    public Comment editComment(@PathVariable Long id, @RequestParam String text) {
        Comment comment = commentRepository.getReferenceById(id);
        comment.setText(text);
        return commentRepository.save(comment);
    }

    @CrossOrigin
    @DeleteMapping("/video/{id}/comment/delete")
    public void deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
    }
}
