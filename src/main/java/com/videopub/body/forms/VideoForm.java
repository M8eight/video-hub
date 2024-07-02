package com.videopub.body.forms;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Getter
public class VideoForm implements Serializable {
    private String name;

    private int duration;

    private MultipartFile file;
}
