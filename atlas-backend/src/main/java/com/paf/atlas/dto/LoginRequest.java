package com.paf.atlas.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class LoginRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;

}
