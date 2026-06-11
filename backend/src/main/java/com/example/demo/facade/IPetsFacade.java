package com.example.demo.facade;

import java.util.List;

import com.example.demo.dtos.PetsDto;
import com.example.demo.dtos.PetsRequestDto;

public interface IPetsFacade {

    List<PetsDto> getAll();

    PetsDto getById(Long id);

    PetsDto updatePets(Long id, PetsRequestDto dto);

    void removePets(Long id);
}