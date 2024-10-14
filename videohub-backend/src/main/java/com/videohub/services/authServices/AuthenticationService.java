package com.videohub.services.authServices;

import com.videohub.dtos.userDtos.LoginDto;
import com.videohub.dtos.userDtos.UserDto;
import com.videohub.models.User;
import com.videohub.services.userServices.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public String signUp(UserDto userDto) {
        return jwtService.generateToken(userService.create(userDto));
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
