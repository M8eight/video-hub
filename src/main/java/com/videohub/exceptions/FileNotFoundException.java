package com.videohub.exceptions;

public class FileNotFoundException extends RuntimeException {
    public FileNotFoundException() {
        super("Video file not found");
    }
}
