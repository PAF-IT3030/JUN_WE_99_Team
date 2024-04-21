package com.paf.atlas.service;


import com.paf.atlas.entity.Like;

public interface LikeService {
    void addLike(Like like);

    void removeLikeById(String likeId);
}
