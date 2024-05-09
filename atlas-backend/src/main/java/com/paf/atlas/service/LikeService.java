package com.paf.atlas.service;

import com.paf.atlas.model.Like;

public interface LikeService {
    Like addLike(Like like);

    void removeLikeById(String likeId);
}
