package com.paf.atlas.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sharedPosts")
public class SharedPost {

    @Id
    private String id;

    private String parentPostId;

    private String userId;

    private LocalDateTime sharedTime = LocalDateTime.now();

    private User postedUser;

    private Post sharedPost;

    private List<String> imageUrl;

    private String description;

    private List<Comment> comments;

    private List<Like> likes;

}
