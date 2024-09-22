package com.videohub.dtos;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
public class ResetPasswordDto implements Serializable {
    private String oldPassword;
    private String password;
}
