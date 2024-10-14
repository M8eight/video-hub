package com.videohub.dtos.userDtos;

import com.videohub.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class EditRolesDto {
    private Long id;
    private Set<Role> roles;
}
