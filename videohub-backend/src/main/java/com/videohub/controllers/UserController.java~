package com.videohub.controllers;

import com.videohub.dtos.ResetPasswordDto;
import com.videohub.models.User;
import com.videohub.services.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin
public class UserController {
    UserService userService;

    @GetMapping("/api/user/{id}")
    User getUser(@PathVariable Long id) {
        return userService.getById(id);
    }

    @PostMapping("/api/user/avatar")
    User setUserAvatar(@RequestAttribute MultipartFile avatar) {
        return userService.updateAvatar(avatar);
    }

    @PostMapping("/api/user/password/reset")
    User userPasswordReset(@ModelAttribute ResetPasswordDto dto) {
        return userService.changePassword(dto.getOldPassword(), dto.getPassword());
    }
}
