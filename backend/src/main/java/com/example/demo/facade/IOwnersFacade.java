package com.example.demo.facade;

import java.util.List;

import com.example.demo.dtos.OwnersDto;
import com.example.demo.dtos.OwnersRequestDto;

public interface IOwnersFacade {

    List<OwnersDto> getAll();

    OwnersDto getById(Long id);

    OwnersDto addOwner(OwnersRequestDto dto);

    OwnersDto updateOwner(Long id, OwnersRequestDto dto);

    void removeOwner(Long id);
}
