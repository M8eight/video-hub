package com.videohub.controllers;

import com.videohub.configurations.PreloadDB;
import com.videohub.daos.UserForm;
import com.videohub.models.User;
import com.videohub.services.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrationController {
    private final UserService userService;

    @Autowired
    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    private static final Logger log = LoggerFactory.getLogger(PreloadDB.class);

    @PostMapping("/auth/register")
    User registrationUser(@ModelAttribute UserForm userForm, HttpServletRequest request) {
        User user = userService.createUser(userForm);
        try {
            request.login(userForm.getUsername(), userForm.getPassword());
        } catch (ServletException ex) {
            log.error("Could not authorize user {}", userForm.getUsername());
        }
        return user;
    }
}
