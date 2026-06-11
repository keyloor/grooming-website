package com.example.demo.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dtos.PetsDto;
import com.example.demo.dtos.PetsRequestDto;
import com.example.demo.mappers.PetsMapper;
import com.example.demo.services.IPetsService;

import jakarta.transaction.Transactional;

@Component
public class PetsFacade implements IPetsFacade {

    @Autowired
    IPetsService petsService;

    @Autowired
    PetsMapper petsMapper;

    @Override
    public List<PetsDto> getAll() {
        return petsMapper.toPetsDtoList(petsService.getAll());
    }

    @Override
    public PetsDto getById(Long id) {
        return petsMapper.toPetsDto(petsService.getById(id));
    }

    @Override
    @Transactional
    public PetsDto updatePets(Long id, PetsRequestDto dto) {
        var entity = petsService.updatePets(id, dto);
        return petsMapper.toPetsDto(entity);
    }

    @Override
    @Transactional
    public void removePets(Long id) {
        petsService.removePets(id);
    }
}