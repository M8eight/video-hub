package com.videohub.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;


@Getter
@Setter
@ToString
public class VideoFilterCriteriaDto {
    private @Min(0) Integer offset = 0;
    private @Min(2) @Max(100) Integer limit = 30;
    private List<String> tags = null;
    private String sortBy = "new";
}
