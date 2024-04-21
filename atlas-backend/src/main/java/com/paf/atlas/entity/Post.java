package com.paf.atlas.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    private String userId;

    private List<String> mediaUrl;

    private String description;

    private LocalDateTime postedTime = LocalDateTime.now();

    private String postType;

    private User postedUser;

    private List<Comment> comments;

    private List<Like> likes;

}
