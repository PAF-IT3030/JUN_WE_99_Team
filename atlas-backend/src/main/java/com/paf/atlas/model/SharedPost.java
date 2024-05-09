package com.paf.atlas.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "sharedPosts")
public class SharedPost {

    @Id
    private String id;

    @Field(name = "parentPostId")
    private String parentPostId;

    @Field(name = "userId")
    private String userId;

    @Field(name = "imageUrl")
    private List<String> imageUrl;

    @Field(name = "description")
    private String description;

    @Transient
    private List<Comment> comments;

    @Transient
    private List <Like> likes;

    private LocalDateTime sharedTime;

    private User postedUser;

    private Post sharedPost;
}
