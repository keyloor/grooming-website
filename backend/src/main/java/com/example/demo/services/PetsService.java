package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.PetsRequestDto;
import com.example.demo.entities.Breeds;
import com.example.demo.entities.Pets;
import com.example.demo.exceptions.PetsNotFoundException;
import com.example.demo.repositories.BreedsRepository;
import com.example.demo.repositories.PetsRepository;

@Service
public class PetsService implements IPetsService {

    @Autowired
    private PetsRepository petsRepository;

    @Autowired
    private BreedsRepository breedsRepository;

    @Override
    public List<Pets> getAll() {
        return petsRepository.getAll();
    }

    @Override
    public Pets getById(Long id) {
        return petsRepository.findById(id)
                .orElseThrow(() -> new PetsNotFoundException("Pet not found"));
    }

    @Override
    public Pets updatePets(Long id, PetsRequestDto dto) {
        var pets = petsRepository.findById(id)
                .orElseThrow(() -> new PetsNotFoundException("Pet not found"));

        pets.setName(dto.getName());
        pets.setAge(dto.getAge());
        pets.setNotes(dto.getNotes());

        if (dto.getBreedId() != null) {
            Breeds breed = breedsRepository.findById(dto.getBreedId()).orElse(null);
            pets.setBreed(breed);
        }

        return petsRepository.updatePets(pets);
    }

    @Override
    public void removePets(Long id) {
        var pets = petsRepository.findById(id)
                .orElseThrow(() -> new PetsNotFoundException("Pet not found"));
        petsRepository.delete(pets);
    }
}