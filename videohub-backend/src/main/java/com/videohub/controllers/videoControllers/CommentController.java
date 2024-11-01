package com.videohub.controllers.videoControllers;

import com.videohub.dtos.CommentDto;
import com.videohub.models.Comment;
import com.videohub.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api")
@RestController
@RequiredArgsConstructor
@CrossOrigin
public class CommentController {
    final private CommentService commentService;
    
    @GetMapping("/video/{videoId}/comments")
    public List<Comment> getCommentsEndpoint(@PathVariable Long videoId) {
        return commentService.getComments(videoId);
    }

    @PostMapping("/video/{videoId}/comment")
    public Comment createCommentEndpoint(@PathVariable Long videoId, @ModelAttribute CommentDto commentDto) {
        return commentService.createComment(videoId, commentDto.getText());
    }

    @PutMapping("/video/{commentId}/comment/edit")
    public Comment editCommentEndpoint(@PathVariable Long commentId, @RequestParam String text) {
        return commentService.editComment(commentId, text);
    }

    @DeleteMapping("/video/{commentId}/comment")
    public void deleteCommentEndpoint(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }
}
