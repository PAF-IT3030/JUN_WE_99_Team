package com.paf.atlas.service;

import com.paf.atlas.repository.LikeRepository;
import com.paf.atlas.entity.Like;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;

    public LikeServiceImpl(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    @Override
    @Transactional
    public void addLike(Like like) {
        if (like == null) {
            throw new IllegalArgumentException("Cannot add a null like");
        }
        likeRepository.save(like);
    }

    @Override
    @Transactional
    public void removeLikeById(String likeId) {
        if (likeId == null || likeId.isEmpty()) {
            throw new IllegalArgumentException("Like ID must not be null or empty");
        }
        likeRepository.deleteById(likeId);
    }
}
