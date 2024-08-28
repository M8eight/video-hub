package com.videohub.dtos;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
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
                ", email='" + email + '\'' +
                '}';
    }
}
