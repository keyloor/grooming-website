package com.example.demo.services;

import java.util.List;

import com.example.demo.dtos.OwnersRequestDto;
import com.example.demo.entities.Owners;

public interface IOwnersService {

    List<Owners> getAll();

    Owners getById(Long id);

    Owners addOwner(OwnersRequestDto dto);

    Owners updateOwner(Long id, OwnersRequestDto dto);

    void removeOwner(Long id);
}
