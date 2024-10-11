package com.videohub.dtos;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto implements Serializable {
    private String name;
    private String description;
    private List<String> videoTags;
    private @Nullable MultipartFile videoFile;
    private @Nullable MultipartFile previewFile;
}
