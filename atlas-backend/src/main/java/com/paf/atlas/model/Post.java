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
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    @Field(name = "userId")
    private String userId;

    @Field(name = "mediaUrl")
    private List<String> mediaUrl;

    @Field(name = "description")
    private String description;

    private String postType;

    private List<Map<String, String>> extraFields;

    private LocalDateTime postedTime;

    private User postedUser;

    @Transient
    private List<Comment> comments;

    @Transient
    private List<Like> likes;

}
