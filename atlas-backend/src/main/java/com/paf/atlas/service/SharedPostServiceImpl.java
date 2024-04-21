package com.paf.atlas.service;

import com.paf.atlas.entity.SharedPost;
import com.paf.atlas.repository.CommentRepository;
import com.paf.atlas.repository.LikeRepository;
import com.paf.atlas.repository.SharedPostRepository;
import com.paf.atlas.repository.UserRepository;
import com.paf.atlas.entity.Post;
import com.paf.atlas.entity.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SharedPostServiceImpl implements SharedPostService {

    private final SharedPostRepository sharedPostRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostServiceImpl postService;

    public SharedPostServiceImpl(SharedPostRepository sharedPostRepository, CommentRepository commentRepository,
                                 LikeRepository likeRepository, UserRepository userRepository, PostServiceImpl postService) {
        this.sharedPostRepository = sharedPostRepository;
        this.commentRepository = commentRepository;
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.postService = postService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<SharedPost> getAllSharedPosts() {
        List<SharedPost> sharedPosts = sharedPostRepository.findAll();
        sharedPosts.forEach(this::mapValuesToSharedPost);
        return sharedPosts;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<SharedPost> getSharedPostById(String id) {
        Optional<SharedPost> sharedPost = sharedPostRepository.findById(id);
        sharedPost.ifPresent(this::mapValuesToSharedPost);
        return sharedPost;
    }

    @Override
    public SharedPost createSharedPost(SharedPost sharedPost) {
        if (sharedPost == null) {
            throw new IllegalArgumentException("Shared post cannot be null");
        }
        return sharedPostRepository.save(sharedPost);
    }

    @Override
    public SharedPost updateSharedPost(String id, SharedPost sharedPost) {
        if (sharedPost == null) {
            throw new IllegalArgumentException("Shared post cannot be null");
        }
        Optional<SharedPost> optionalSharedPost = sharedPostRepository.findById(id);
        if (optionalSharedPost.isEmpty()) {
            throw new IllegalArgumentException("Shared post with ID " + id + " not found");
        }
        return sharedPostRepository.save(sharedPost);
    }


    @Override
    public void deleteSharedPost(String id) {
        sharedPostRepository.deleteById(id);
    }

    private void mapValuesToSharedPost(SharedPost sharedPost) {
        sharedPost.setComments(commentRepository.findByPostId(sharedPost.getId()));
        sharedPost.setLikes(likeRepository.findByPostId(sharedPost.getId()));

        if (sharedPost.getUserId() != null) {
            Optional<User> user = userRepository.findById(sharedPost.getUserId());
            user.ifPresent(sharedPost::setPostedUser);
        }

        if (sharedPost.getParentPostId() != null) {
            Optional<Post> post = postService.getPostById(sharedPost.getParentPostId());
            post.ifPresent(sharedPost::setSharedPost);
        }
    }
}
