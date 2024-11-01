package com.videohub.interfaces;

import com.videohub.dtos.userDtos.UserDto;
import com.videohub.models.Role;
import com.videohub.models.User;
import org.springframework.data.domain.Page;

import java.util.Set;

public interface AdminDAO {
    User createAdmin(UserDto userDto);
    void deleteById(Long id);
    Page<User> getAll(Integer offset, Integer limit);
    User editUserRoles(Long id, Set<Role> roles);
}
