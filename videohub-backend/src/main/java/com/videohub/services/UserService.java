package com.videohub.services;

import com.videohub.dtos.UserDto;
import com.videohub.dtos.UserResponseDto;
import com.videohub.exceptions.UserAlreadyRegisterException;
import com.videohub.exceptions.UserNotFoundException;
import com.videohub.helpers.ValidUserFields;
import com.videohub.interfaces.UserDAO;
import com.videohub.mappers.UserMapper;
import com.videohub.models.Role;
import com.videohub.models.User;
import com.videohub.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements UserDAO {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    private final JwtService jwtService;

    @SneakyThrows
    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @SneakyThrows
    @Override
    public User getRefById(Long id) {
        try {
            return userRepository.getReferenceById(id);
        } catch (EntityNotFoundException e) {
            throw new UserNotFoundException(id);
        }
    }

    @SneakyThrows
    @Override
    public User findByLogin(String username) {
        return userRepository.findUserByLogin(username).orElseThrow(() -> new UserNotFoundException(username));
    }

    @SneakyThrows
    @Override
    public UserResponseDto editUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        user.setLogin(ValidUserFields.validNotNull(userDto.getLogin(), user.getLogin()));
        user.setEmail(ValidUserFields.validNotNull(userDto.getEmail(), user.getEmail()));
        user.setPhoneNumber(ValidUserFields.validNotNull(userDto.getPhoneNumber(), user.getPhoneNumber()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @SneakyThrows
    @Override
    public UserResponseDto changePassword(Long id, String password) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        user.setPassword(passwordEncoder.encode(password));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public UserDetailsService userDetailsService() {
        return this::findByLogin;
    }

    @SneakyThrows
    @Override
    public User createUser(UserDto userDto) {
        if (userRepository.existsUserByLogin(userDto.getLogin())) {
            throw new UserAlreadyRegisterException(userDto);
        }

        User user = userMapper.toUserDtoRegister(userDto);
        user.setRoles(Collections.singleton(new Role(1L, "ROLE_USER")));
        String passwordEncode = passwordEncoder.encode(userDto.getPassword());
        user.setPassword(passwordEncode);

        return userRepository.save(user);
    }




}
