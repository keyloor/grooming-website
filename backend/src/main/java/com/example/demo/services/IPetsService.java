package com.example.demo.services;

import java.util.List;

import com.example.demo.dtos.PetsRequestDto;
import com.example.demo.entities.Pets;

public interface IPetsService {

    List<Pets> getAll();

    Pets getById(Long id);

    Pets create(PetsRequestDto dto);

    Pets updatePets(Long id, PetsRequestDto dto);

    void removePets(Long id);
}