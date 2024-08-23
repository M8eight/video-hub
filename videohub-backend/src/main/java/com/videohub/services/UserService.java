package com.videohub.services;

import com.videohub.configurations.PreloadDB;
import com.videohub.daos.UserForm;
import com.videohub.interfaces.UserDAO;
import com.videohub.models.Role;
import com.videohub.models.User;
import com.videohub.models.Video;
import com.videohub.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDAO, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> getById(Long id) {
        return Optional.empty();
    }

    @Override
    public Optional<User> getRefById(Long id) {
        return Optional.empty();
    }

    //todo протестить
    @Override
    public Optional<User> getByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User editUser(Long id, UserForm userForm) {
        //todo сделать изменения
        return null;
    }

    @Override
    public User createUser(UserForm userForm) {
        User user = new User();
        user.setUsername(userForm.getUsername());
        String passwordEncode = passwordEncoder.encode(userForm.getPassword());
        user.setPassword(passwordEncode);
        user.setEmail(userForm.getEmail());
        user.setRoles( Collections.singleton(new Role(1L, "ROLE_USER")) );

        return userRepository.save(user);
    }

    @Override
    public User editRole(User user, Role role) {
        return null;
        //todo сделать изменения ролей
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return getByUsername(username).orElseThrow();
    }
}
