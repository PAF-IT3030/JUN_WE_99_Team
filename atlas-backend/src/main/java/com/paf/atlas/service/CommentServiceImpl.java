package com.paf.atlas.service;

import com.paf.atlas.entity.Comment;
import com.paf.atlas.exception.DataNotFoundException;
import com.paf.atlas.repository.CommentRepository;
import com.paf.atlas.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }

    @Override
    public List<Comment> getCommentsByUserId(String userId) {
        return commentRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public Comment addComment(Comment comment) {
        comment.setCommentedTime(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);
        setUserForComment(savedComment);
        return savedComment;
    }

    @Override
    @Transactional
    public Comment updateComment(Comment comment) {
        return commentRepository.findById(comment.getId())
                .map(existingComment -> updateExistingComment(existingComment, comment))
                .orElseThrow(() -> new DataNotFoundException("Comment not found with ID: " + comment.getId()));
    }

    private Comment updateExistingComment(Comment existingComment, Comment updatedComment) {
        existingComment.setText(updatedComment.getText());
        Comment savedComment = commentRepository.save(existingComment);
        setUserForComment(savedComment);
        return savedComment;
    }

    @Override
    @Transactional
    public void deleteComment(String id, String userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Comment not found with ID: " + id));

        if (!comment.getUserId().equals(userId)) {
            throw new DataNotFoundException("You don't have permission to delete this comment.");
        }

        commentRepository.deleteById(id);
    }

    private void setUserForComment(Comment comment) {
        userRepository.findById(comment.getUserId())
                .ifPresent(comment::setCommentedUser);
    }
}
