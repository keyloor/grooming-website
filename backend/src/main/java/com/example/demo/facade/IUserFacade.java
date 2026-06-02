package com.example.demo.facade;

import java.util.List;
import java.util.UUID;

import com.example.demo.dtos.UserDto;
import com.example.demo.dtos.UserRequestDto;

public interface IUserFacade {

    List<UserDto> getAll();

    UserDto getByResourceId(UUID resourceId);

    UserDto addUser(UserRequestDto userDto);

    UserDto updateUser(UUID resourceId, UserRequestDto userDto);

    void removeUser(UUID resourceId);
}
