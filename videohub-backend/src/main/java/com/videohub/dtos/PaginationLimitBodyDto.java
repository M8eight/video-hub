package com.videohub.dtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PaginationLimitBodyDto {
    @Min(0) Integer offset = 0;
    @Min(2) @Max(100) Integer limit = 30;
}
