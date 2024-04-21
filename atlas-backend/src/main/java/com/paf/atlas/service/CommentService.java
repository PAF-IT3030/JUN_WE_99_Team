package com.paf.atlas.service;


import com.paf.atlas.entity.Comment;

import java.util.List;


public interface CommentService {

    List<Comment> getCommentsByPostId(String postId);

    List<Comment> getCommentsByUserId(String userId);

    Comment addComment(Comment comment);

    Comment updateComment(Comment comment);

    void deleteComment(String id, String userId);
}
