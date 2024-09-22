package com.videohub.interfaces;

import com.videohub.dtos.UserDto;
import com.videohub.exceptions.UserAlreadyRegisterException;
import com.videohub.models.Role;
import com.videohub.models.User;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserDAO {
    User getById(Long id);
    User getRefById(Long id);
    User findByLogin(String login);
    User createUser(UserDto userForm);
    User editUser(Long id, UserDto userForm);
    @Deprecated(since = "Нужно ли в сервисе копировать репозиторий")
    User save(User user);
    User changePassword(String oldPassword, String password);
    UserDetailsService userDetailsService();
    User updateAvatar(MultipartFile avatar);
}
