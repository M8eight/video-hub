package com.videohub.services;

import com.videohub.dtos.LoginDto;
import com.videohub.dtos.UserDto;
import com.videohub.models.JwtAuthenticationResponse;
import com.videohub.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String signUp(UserDto userDto) {
        return jwtService.generateToken(userService.createUser(userDto));
    }

    public String signIn(LoginDto loginDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getLogin(),
                loginDto.getPassword()
        ));
        User user = userService.findByLogin(loginDto.getLogin());
        return jwtService.generateToken(user);
    }
}
