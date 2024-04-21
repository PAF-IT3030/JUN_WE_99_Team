package com.paf.atlas.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * Represents a comment on a post in the system.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "comments")
public class Comment {

    @Id
    private String id;

    private String postId;

    private String userId;

    private LocalDateTime commentedTime = LocalDateTime.now();

    private User commentedUser;

    private String text;

}
