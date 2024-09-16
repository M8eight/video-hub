package com.videohub.controllers;

import com.videohub.dtos.EditRolesDto;
import com.videohub.dtos.PaginationLimitBodyDto;
import com.videohub.dtos.UserDto;
import com.videohub.models.Role;
import com.videohub.models.User;
import com.videohub.repositories.UserRepository;
import com.videohub.services.AdminService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("api/admin")
@CrossOrigin
@Slf4j
public class AdminController {
    final private AdminService adminService;
    final private UserRepository userRepository;

    @SneakyThrows
    @PostMapping("/create")
    public User createAdmin(@ModelAttribute @Valid UserDto userDto) {
        return adminService.createAdmin(userDto);
    }

    @SneakyThrows
    @GetMapping("/user/users")
    public Page<User> getAllUsers(PaginationLimitBodyDto requestParam) {
        return adminService.getAll(requestParam.getOffset(), requestParam.getLimit());
    }

    @PostMapping("/user/edit/roles")
    public User editUserRoles(@RequestBody EditRolesDto editRolesDto) {
        return adminService.editUserRoles(editRolesDto.getId(), editRolesDto.getRoles());
    }

    @DeleteMapping("/user/delete/{id}")
    public boolean deleteUser(@PathVariable Long id) {
        adminService.deleteById(id);
        return true;
    }

    @GetMapping("/count/video")
    public long countVideo() {
        return adminService.countVideo();
    }

    @GetMapping("/count/user")
    public long countUser() {
        return adminService.countUser();
    }

    @GetMapping("/count/comment")
    public long countComment() {
        return adminService.countComment();
    }
}
