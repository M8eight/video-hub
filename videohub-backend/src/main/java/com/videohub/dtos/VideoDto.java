package com.videohub.dtos;

import com.videohub.models.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto implements Serializable {
    private String name;
    private String description;
    private MultipartFile videoFile;
}
