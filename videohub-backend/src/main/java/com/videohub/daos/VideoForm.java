package com.videohub.daos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Getter
@Setter
public class VideoForm implements Serializable {
    private String name;
    private String description;
    private MultipartFile videoFile;
}
