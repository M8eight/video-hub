package com.videohub.helpers;


import com.videohub.exceptions.UserNotAuthorizedException;
import com.videohub.models.User;
import com.videohub.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthHelper {
    private final UserRepository userRepository;

    @SneakyThrows
    public User getUserFromAuth() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findUserByLogin(username).orElseThrow(UserNotAuthorizedException::new);
    }
}
