package com.paf.atlas.entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Data
@Builder
@Document(collection = "likes")
public class Like {
    @Id
    private String id;


    private String userId;

    private String postId;

    private LocalDateTime likedTime = LocalDateTime.now();

    private User likedUser;

}
