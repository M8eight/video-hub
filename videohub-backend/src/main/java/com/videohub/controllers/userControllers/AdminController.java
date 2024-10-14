package com.videohub.controllers.userControllers;

import com.videohub.dtos.userDtos.EditRolesDto;
import com.videohub.dtos.PaginationLimitBodyDto;
import com.videohub.dtos.userDtos.UserDto;
import com.videohub.models.User;
import com.videohub.repositories.userRepositories.UserRepository;
import com.videohub.services.authServices.AdminService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
    public User createAdminEndpoint(@ModelAttribute @Valid UserDto userDto) {
        return adminService.createAdmin(userDto);
    }

    @SneakyThrows
    @GetMapping("/user/users")
    public Page<User> getAllUsersEndpoint(PaginationLimitBodyDto requestParam) {
        return adminService.getAll(requestParam.getOffset(), requestParam.getLimit());
    }

    @PostMapping("/user/edit/roles")
    public User editUserRolesEndpoint(@RequestBody EditRolesDto editRolesDto) {
        return adminService.editUserRoles(editRolesDto.getId(), editRolesDto.getRoles());
    }

    @DeleteMapping("/user/delete/{id}")
    public boolean deleteUserEndpoint(@PathVariable Long id) {
        adminService.deleteById(id);
        return true;
    }

    @GetMapping("/count/video")
    public long countVideoEndpoint() {
        return adminService.countVideo();
    }

    @GetMapping("/count/user")
    public long countUserEndpoint() {
        return adminService.countUser();
    }

    @GetMapping("/count/comment")
    public long countCommentEndpoint() {
        return adminService.countComment();
    }
}
