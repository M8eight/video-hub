package com.videohub.helpers;

import com.videohub.exceptions.UserNotAuthorizedException;
import com.videohub.models.User;
import com.videohub.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Helper;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthHelper {
    private final UserRepository userRepository;

    @Bean
    public User getUser() throws UserNotAuthorizedException {
        var authContext = SecurityContextHolder.getContext().getAuthentication();
        User user;
        if (authContext != null && authContext.isAuthenticated()) {
            user = userRepository.findUserByLogin(((UserDetails) authContext.getPrincipal()).getUsername()).orElseThrow();
        } else {
            throw new UserNotAuthorizedException();
        }
        return user;
    }
}
