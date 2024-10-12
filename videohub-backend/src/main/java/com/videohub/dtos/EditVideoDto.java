package com.videohub.dtos;

import lombok.*;
import org.apache.commons.lang3.builder.ToStringExclude;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditVideoDto implements Serializable {
    private Long id;
    private String name;
    private String description;
    private @Nullable List<String> videoTags;
    private @Nullable MultipartFile videoFile;
    private @Nullable String previewDataUrl;
}
