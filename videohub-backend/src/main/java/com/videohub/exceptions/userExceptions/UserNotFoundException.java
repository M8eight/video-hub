package com.videohub.exceptions.userExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.text.MessageFormat;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserNotFoundException extends Exception {
    public UserNotFoundException(Long id)  {
        super(MessageFormat.format("user with id {0} not found", id));
    }

    public UserNotFoundException(String login)  {
        super(MessageFormat.format("user with login {0} not found", login));
    }
}
