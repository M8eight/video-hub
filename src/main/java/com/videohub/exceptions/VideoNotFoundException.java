package com.videohub.exceptions;

public class VideoNotFoundException extends RuntimeException {
    public VideoNotFoundException(Long id) {
        super("Not find video id=" + id);
    }
}
