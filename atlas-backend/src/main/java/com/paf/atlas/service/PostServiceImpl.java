package com.paf.atlas.service;

import com.paf.atlas.entity.Comment;
import com.paf.atlas.entity.Like;
import com.paf.atlas.entity.Post;
import com.paf.atlas.entity.User;
import com.paf.atlas.repository.CommentRepository;
import com.paf.atlas.repository.LikeRepository;
import com.paf.atlas.repository.PostRepository;
import com.paf.atlas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Optional<Post> getPostById(String postId) {
        Optional<Post> post = postRepository.findById(postId);
        post.ifPresent(this::mapValuesToPost);
        return post;
    }


    private void mapValuesToPost(Post post) {
        List<Comment> comments = commentRepository.findByPostId(post.getId());
        post.setComments(comments);
        comments.forEach(comment -> {
            Optional<User> user = userRepository.findById(comment.getUserId());
            user.ifPresent(comment::setCommentedUser);
        });

        List<Like> likes = likeRepository.findByPostId(post.getId());
        post.setLikes(likes);

        if (post.getUserId() != null) {
            Optional<User> user = userRepository.findById(post.getUserId());
            user.ifPresent(post::setPostedUser);
        }
    }
}
