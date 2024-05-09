package com.paf.atlas.controller;

import com.paf.atlas.model.SharedPost;
import com.paf.atlas.service.SharedPostService;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/shared-posts")
public class SharedPostController {

    private final SharedPostService sharedPostService;

    @GetMapping
    public ResponseEntity<List<SharedPost>> getAllSharedPosts() {
        return ResponseEntity.ok(sharedPostService.getAllSharedPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SharedPost> getSharedPostById(@PathVariable String id) {
        Optional<SharedPost> optionalSharedPost = sharedPostService.getSharedPostById(id);
        return optionalSharedPost.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SharedPost> createSharedPost(@RequestBody SharedPost sharedPost) {
        return ResponseEntity.status(HttpStatus.CREATED).body(sharedPostService.createSharedPost(sharedPost));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SharedPost> updateSharedPost(@PathVariable String id, @RequestBody SharedPost sharedPost) {
        SharedPost updatedSharedPost = sharedPostService.updateSharedPost(id, sharedPost);
        if (updatedSharedPost != null) {
            return ResponseEntity.ok(updatedSharedPost);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteSharedPost(@PathVariable String id) {
        sharedPostService.deleteSharedPost(id);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }
}
