package com.videohub.interfaces;

import com.videohub.daos.UserForm;
import com.videohub.models.Role;
import com.videohub.models.User;

import java.util.List;
import java.util.Optional;

public interface UserDAO {
    Optional<User> getById(Long id);
    Optional<User> getRefById(Long id);
    Optional<User> getByUsername(String username);
    List<User> getAll();
    void deleteById(Long id);
    User createUser(UserForm userForm);
    User editRole(User user, Role role);
    User editUser(Long id, UserForm userForm);

}
