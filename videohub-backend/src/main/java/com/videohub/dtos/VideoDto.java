package com.videohub.dtos;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Getter
@Setter
public class VideoDto implements Serializable {
    private String name;
    private String description;
    private MultipartFile videoFile;
}
