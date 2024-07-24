package com.videohub.exceptions;

public class VideoBadRequestException extends RuntimeException {
    public VideoBadRequestException(String name) {
        super("Bad request to send video " + name);
    }
}
