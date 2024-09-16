package com.videohub.services;

import com.videohub.dtos.UserDto;
import com.videohub.exceptions.UserAlreadyRegisterException;
import com.videohub.exceptions.UserNotFoundException;
import com.videohub.interfaces.AdminDao;
import com.videohub.mappers.UserMapper;
import com.videohub.models.Comment;
import com.videohub.models.Role;
import com.videohub.models.User;
import com.videohub.repositories.CommentRepository;
import com.videohub.repositories.UserRepository;
import com.videohub.repositories.VideoRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService implements AdminDao {
    final private UserRepository userRepository;
    final private UserMapper userMapper;
    final private PasswordEncoder passwordEncoder;
    final private VideoRepository videoRepository;
    final private CommentRepository commentRepository;

    @Override
    public Page<User> getAll(Integer offset, Integer limit) {
        return userRepository.findAll(PageRequest.of(offset, limit));
    }

    @SneakyThrows
    @Override
    @Deprecated(since = "move to admin service")
    public User createAdmin(UserDto userDto) {
        if (userRepository.existsUserByLogin(userDto.getLogin())) {
            throw new UserAlreadyRegisterException(userDto);
        }

        User user = userMapper.toUserDtoRegister(userDto);
//        user.setRoles(Collections.singleton(new Role(1L, "ROLE_USER")));
         Set<Role> roles = new HashSet<>();
        roles.add(new Role(1L, "ROLE_USER"));
        roles.add(new Role(2L, "ROLE_ADMIN"));
        user.setRoles(roles);
        String passwordEncode = passwordEncoder.encode(userDto.getPassword());
        user.setPassword(passwordEncode);

        return userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @SneakyThrows
    public User editUserRoles(Long id, Set<Role> roles) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        log.info(String.valueOf(roles));
        user.setRoles(roles);
        return userRepository.save(user);
    }

    @GetMapping("/count/video")
    public long countVideo() {
        return videoRepository.countVideo();
    }

    @GetMapping("/count/user")
    public long countUser() {
        return userRepository.countUser();
    }

    @GetMapping("/count/comment")
    public long countComment() {
        return commentRepository.countComment();
    }

}
