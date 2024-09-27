package com.videohub.filters;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VideoCriteria {
    private String key;
    private String operation;
    private Object value;
}