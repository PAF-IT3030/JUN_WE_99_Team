package com.paf.atlas.controller;

import com.paf.atlas.model.Post;
import com.paf.atlas.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostController {

    private final PostService postService;

    @GetMapping("/")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable String postId) {
        Optional<Post> post = postService.getPostById(postId);
        return post.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<Post> createPost(@Valid @RequestBody Post post) {
        Post newPost = postService.createPost(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable String postId, @Valid @RequestBody Post post) {
        Optional<Post> existingPost = postService.getPostById(postId);
        if (existingPost.isPresent()) {
            post.setId(postId);
            Post updatedPost = postService.updatePost(post);
            return new ResponseEntity<>(updatedPost, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Map<String, String>> deletePost(@PathVariable String postId) {
        Optional<Post> post = postService.getPostById(postId);
        Map<String, String> response = new HashMap<>();
        if (post.isPresent()) {
            postService.deletePostById(postId);
            response.put("response", "success");
        } else {
            response.put("response", "failed");
        }
        return ResponseEntity.ok(response);
    }
}
