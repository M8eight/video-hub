package com.videohub.controllers;

import com.videohub.configurations.PreloadDB;
import com.videohub.daos.UserForm;
import com.videohub.models.User;
import com.videohub.services.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RegistrationController {

    private final UserService userService;

    @CrossOrigin
    @PostMapping("/auth/register")
    ResponseEntity<String> registrationUser(@ModelAttribute UserForm userForm, HttpServletRequest request) {
        log.info(userForm.getUsername());
        log.info(userForm.getPassword());
        userService.createUser(userForm);
        try {
            request.login(userForm.getUsername(), userForm.getPassword());
        } catch (ServletException ex) {
            log.error("Could not authorize user {}", userForm.getUsername());
        }
        return new ResponseEntity<>("user " + userForm.getUsername() + " has been created" , HttpStatus.CREATED);
    }
}
