package com.videohub.controllers.userControllers;

import com.videohub.dtos.userDtos.ResetPasswordDto;
import com.videohub.models.User;
import com.videohub.services.userServices.UserService;
import lombok.AllArgsConstructor;
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
    User getUserEndpoint(@PathVariable Long id) {
        return userService.getById(id);
    }

    @PostMapping("/api/user/avatar")
    User setUserAvatarEndpoint(@RequestAttribute MultipartFile avatar) {
        return userService.updateAvatar(avatar);
    }

    @PostMapping("/api/user/password/reset")
    User userPasswordResetEndpoint(@ModelAttribute ResetPasswordDto dto) {
        return userService.changePassword(dto.getOldPassword(), dto.getPassword());
    }
}
