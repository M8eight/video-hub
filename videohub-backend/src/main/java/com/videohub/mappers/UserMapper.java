package com.videohub.mappers;

import com.videohub.dtos.userDtos.UserDto;
import com.videohub.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User toUserDtoRegister(UserDto UserDto);
}
