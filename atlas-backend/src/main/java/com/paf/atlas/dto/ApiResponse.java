package com.paf.atlas.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class ApiResponse {
    private boolean success;
    private String message;

}
