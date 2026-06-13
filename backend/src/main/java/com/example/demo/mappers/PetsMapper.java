package com.example.demo.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dtos.PetsDto;
import com.example.demo.dtos.PetsRequestDto;
import com.example.demo.entities.Pets;
import com.example.demo.models.PetsRequestModel;
import com.example.demo.models.PetsResponseModel;

@Component
public class PetsMapper {

    public PetsDto toPetsDto(Pets pets) {
        if (pets == null) return null;

        return new PetsDto(
                pets.getId(),
                pets.getName(),
                pets.getSpecies(),
                pets.getSize(),
                pets.getAge(),
                pets.getNotes(),
                pets.getBreed() != null ? pets.getBreed().getName() : null,
                pets.getOwner() != null ? pets.getOwner().getId() : null);
    }

    public List<PetsDto> toPetsDtoList(List<Pets> petsList) {
        if (petsList == null) return null;

        return petsList.stream()
                .map(this::toPetsDto)
                .collect(Collectors.toList());
    }

    public PetsResponseModel toPetsResponseModel(PetsDto dto) {
        if (dto == null) return null;

        return new PetsResponseModel(
                dto.id(),
                dto.name(),
                dto.species(),
                dto.size(),
                dto.age(),
                dto.notes(),
                dto.breedName(),
                dto.ownerId());
    }

    public List<PetsResponseModel> toPetsResponseModelList(List<PetsDto> dtos) {
        if (dtos == null) return null;

        return dtos.stream()
                .map(this::toPetsResponseModel)
                .collect(Collectors.toList());
    }

    public PetsRequestDto toPetsRequestDto(PetsRequestModel model) {
        if (model == null) return null;

        PetsRequestDto dto = new PetsRequestDto();
        dto.setName(model.name());
        dto.setSpecies(model.species());
        dto.setSize(model.size());
        dto.setAge(model.age());
        dto.setNotes(model.notes());
        dto.setBreedName(model.breedName());
        dto.setBreedId(model.breedId());
        dto.setOwnerId(model.ownerId());
        return dto;
    }
}