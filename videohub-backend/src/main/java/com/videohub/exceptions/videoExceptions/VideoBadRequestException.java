package com.videohub.exceptions.videoExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class VideoBadRequestException extends RuntimeException {
    public VideoBadRequestException(String name) {
        super("Bad request to send video " + name);
    }
}
