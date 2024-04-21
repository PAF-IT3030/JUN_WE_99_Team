package com.paf.atlas.resource;

import com.paf.atlas.entity.Comment;
import com.paf.atlas.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentResources {

    private final CommentService commentService;

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return this.commentService.getCommentsByPostId(postId);
    }

    @GetMapping("/user/{userId}")
    public List<Comment> getCommentsByUserId(@PathVariable String userId) {
        return this.commentService.getCommentsByUserId(userId);
    }


    @PostMapping("/")
    public ResponseEntity<Comment> addComment(@Valid @RequestBody Comment comment) {
        Comment savedComment = this.commentService.addComment(comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable String id, @Valid @RequestBody Comment comment) {
        comment.setId(id);
        return this.commentService.updateComment(comment);
    }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable String id, @PathVariable String userId) {
        commentService.deleteComment(id, userId);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }

}
