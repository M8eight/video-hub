package com.videohub.controllers;

import com.videohub.models.User;
import com.videohub.services.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
public class UserController {
    UserService userService;

    @CrossOrigin
    @GetMapping("/api/user/{id}")
    User getUser(@PathVariable Long id) {
        log.info(String.valueOf(id));
        return userService.getById(id);
    }
}
