package com.videohub.dtos;

import com.videohub.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class EditRolesDto {
    private Long id;
    private Set<Role> roles;
}
