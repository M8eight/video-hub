package com.videopub.body.exceptions;

public class VideoFileNotFoundException extends RuntimeException {
    public VideoFileNotFoundException() {
        super("Video file not found");
    }
}
