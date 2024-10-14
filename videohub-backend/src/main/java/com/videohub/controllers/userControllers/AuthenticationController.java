package com.videohub.controllers.userControllers;

import com.videohub.dtos.userDtos.LoginDto;
import com.videohub.dtos.userDtos.UserDto;
import com.videohub.services.authServices.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    /**
     * Registration mapping
     * @return JwtToken
     * */
    @PostMapping("/auth/register")
    String registrationUserEndpoint(@ModelAttribute @Valid UserDto request) {

        return authenticationService.signUp(request);
    }

    /**
     * Login mapping
     * @return JwtToken
     * */
    @SneakyThrows
    @PostMapping("/auth/login")
    String loginUserEndpoint(@ModelAttribute @Valid LoginDto request) {
        return authenticationService.signIn(request);
    }
}
