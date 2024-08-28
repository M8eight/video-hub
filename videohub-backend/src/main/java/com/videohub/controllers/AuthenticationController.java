package com.videohub.controllers;

import com.videohub.dtos.LoginDto;
import com.videohub.dtos.UserDto;
import com.videohub.mappers.UserMapper;
import com.videohub.models.JwtAuthenticationResponse;
import com.videohub.models.User;
import com.videohub.services.AuthenticationService;
import com.videohub.services.JwtService;
import com.videohub.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    /**
     * Registration mapping
     * @return JwtToken
     * */
    @CrossOrigin
    @PostMapping("/auth/register")
    String registrationUser(@ModelAttribute @Valid UserDto request) {
        return authenticationService.signUp(request);
    }

    /**
     * Login mapping
     * @return JwtToken
     * */
    @SneakyThrows
    @CrossOrigin
    @PostMapping("/auth/login")
    String loginUser(@ModelAttribute @Valid LoginDto request) {
        return authenticationService.signIn(request);
    }
}