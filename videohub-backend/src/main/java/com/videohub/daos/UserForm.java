package com.videohub.daos;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Getter
@Setter
public class UserForm implements Serializable {
    private String username;
    private String email;
    private String password;
}
