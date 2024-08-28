package com.videohub.exceptions;

import com.videohub.dtos.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UserAlreadyRegisterException extends Exception{
    public UserAlreadyRegisterException(UserDto userDto) {
        super("User " + userDto.toString() + " is already register");
    }
}
