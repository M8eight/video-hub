package com.videohub.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class VideoBadRequestAdvice {
    @ExceptionHandler(VideoBadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String VideoBadRequestHandler(VideoBadRequestException videoBadRequestException) {
        return videoBadRequestException.getMessage();
    }
}
