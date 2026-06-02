package com.example.demo.services;

import java.util.List;
import java.util.UUID;

import com.example.demo.dtos.UserRequestDto;
import com.example.demo.entities.User;

public interface IUserService {

    List<User> getAll();

    User addUser(UserRequestDto userDto);

    User updateUser(UUID resourceId, UserRequestDto userDto);

    User getByResourceId(UUID resourceId);

    void removeUser(UUID resourceId);
}
