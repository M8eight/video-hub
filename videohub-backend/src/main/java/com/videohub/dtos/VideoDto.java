package com.videohub.dtos;

import com.videohub.models.User;
import com.videohub.models.VideoTag;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoDto implements Serializable {
    private String name;
    private String description;
    private List<String> videoTags;
    private MultipartFile videoFile;
}
