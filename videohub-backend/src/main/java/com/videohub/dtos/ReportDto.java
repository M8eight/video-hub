package com.videohub.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.lang.Nullable;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class ReportDto implements Serializable {
    private String message;
    private @Nullable Long videoId;
    private @Nullable Long userId;
}
