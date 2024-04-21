package com.paf.atlas.resource;

import com.paf.atlas.entity.Like;
import com.paf.atlas.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class LikeResources {
    private final LikeService likeService;

    @PostMapping("/{postId}/likes")
    public ResponseEntity<Map<String, String>> addLikeToPost(@PathVariable String postId, @RequestBody Like like) {
        like.setPostId(postId);
        likeService.addLike(like);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("likes/{likeId}")
    public ResponseEntity<Map<String, String>> removeLikeFromLikeId(@PathVariable String likeId) {
        likeService.removeLikeById(likeId);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }
}
