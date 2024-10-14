package com.videohub.dtos.userDtos;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {
    private String login;
    private String email;
    private String password;
    private String phoneNumber;
    private String token;

    @Override
    public String toString() {
        return "User{" +
                "login='" + login + '\'' +
                ". . . '" + '\'' +
                '}';
    }
}
