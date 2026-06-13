package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.PetsRequestDto;
import com.example.demo.entities.Breeds;
import com.example.demo.entities.Owners;
import com.example.demo.entities.Pets;
import com.example.demo.exceptions.OwnersNotFoundException;
import com.example.demo.exceptions.PetsNotFoundException;
import com.example.demo.repositories.BreedsRepository;
import com.example.demo.repositories.OwnersRepository;
import com.example.demo.repositories.PetsRepository;

@Service
public class PetsService implements IPetsService {

    @Autowired
    private PetsRepository petsRepository;

    @Autowired
    private BreedsRepository breedsRepository;

    @Autowired
    private OwnersRepository ownersRepository;

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
    public Pets create(PetsRequestDto dto) {
        Owners owner = ownersRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new OwnersNotFoundException("Owner not found"));

        Pets pet = Pets.builder()
                .name(dto.getName())
                .species(dto.getSpecies())
                .size(dto.getSize())
                .age(dto.getAge())
                .notes(dto.getNotes())
                .owner(owner)
                .breed(resolveBreed(dto))
                .build();

        return petsRepository.addPets(pet);
    }

    @Override
    public Pets updatePets(Long id, PetsRequestDto dto) {
        var pets = petsRepository.findById(id)
                .orElseThrow(() -> new PetsNotFoundException("Pet not found"));

        pets.setName(dto.getName());
        pets.setAge(dto.getAge());
        pets.setNotes(dto.getNotes());

        if (dto.getSpecies() != null) {
            pets.setSpecies(dto.getSpecies());
        }
        if (dto.getSize() != null) {
            pets.setSize(dto.getSize());
        }

        if (dto.getBreedId() != null || (dto.getBreedName() != null && !dto.getBreedName().isBlank())) {
            pets.setBreed(resolveBreed(dto));
        }

        return petsRepository.updatePets(pets);
    }

    @Override
    public void removePets(Long id) {
        var pets = petsRepository.findById(id)
                .orElseThrow(() -> new PetsNotFoundException("Pet not found"));
        petsRepository.delete(pets);
    }

    /**
     * Resolves the breed for a pet request: prefers an explicit breedId; otherwise
     * looks up the breed by name (case-insensitive) and creates it if it does not exist.
     */
    private Breeds resolveBreed(PetsRequestDto dto) {
        if (dto.getBreedId() != null) {
            return breedsRepository.findById(dto.getBreedId()).orElse(null);
        }

        String breedName = dto.getBreedName();
        if (breedName == null || breedName.isBlank()) {
            return null;
        }

        String trimmed = breedName.trim();
        return breedsRepository.findByNameIgnoreCase(trimmed)
                .orElseGet(() -> breedsRepository.save(Breeds.builder().name(trimmed).build()));
    }
}
