package com.videohub.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class ReportDto implements Serializable {
    private String message;
    private Long videoId;
}
