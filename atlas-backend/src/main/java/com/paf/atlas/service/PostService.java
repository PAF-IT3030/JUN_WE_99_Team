package com.paf.atlas.service;

import com.paf.atlas.entity.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {

    Optional<Post> getPostById(String postId);

}
