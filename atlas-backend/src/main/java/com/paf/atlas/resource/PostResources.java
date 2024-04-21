package com.paf.atlas.resource;

import com.paf.atlas.entity.Post;
import com.paf.atlas.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/posts")
public class PostResources {

    private final PostService postService;

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable String postId) {
        Optional<Post> post = this.postService.getPostById(postId);
        return post.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
