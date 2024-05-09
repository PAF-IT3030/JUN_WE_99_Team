package com.paf.atlas.service;

import com.paf.atlas.model.Like;
import com.paf.atlas.repository.LikeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;

    @Override
    public Like addLike(Like like) {
        like.setLikedTime(LocalDateTime.now());
        return likeRepository.save(like);
    }

    @Override
    public void removeLikeById(String likeId) {
        likeRepository.deleteById(likeId);
    }
}
