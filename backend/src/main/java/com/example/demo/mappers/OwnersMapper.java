package com.example.demo.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dtos.OwnersDto;
import com.example.demo.dtos.OwnersRequestDto;
import com.example.demo.entities.Owners;
import com.example.demo.models.OwnersRequestModel;
import com.example.demo.models.OwnersResponseModel;

@Component
public class OwnersMapper {

    public OwnersDto toOwnersDto(Owners owners) {
        if (owners == null) return null;

        return new OwnersDto(
                owners.getId(),
                owners.getName(),
                owners.getEmail(),
                owners.getPhone());
    }

    public List<OwnersDto> toOwnersDtoList(List<Owners> ownersList) {
        if (ownersList == null) return null;

        return ownersList.stream()
                .map(this::toOwnersDto)
                .collect(Collectors.toList());
    }

    public OwnersResponseModel toOwnersResponseModel(OwnersDto dto) {
        if (dto == null) return null;

        return new OwnersResponseModel(
                dto.id(),
                dto.name(),
                dto.email(),
                dto.phone());
    }

    public List<OwnersResponseModel> toOwnersResponseModelList(List<OwnersDto> dtos) {
        if (dtos == null) return null;

        return dtos.stream()
                .map(this::toOwnersResponseModel)
                .collect(Collectors.toList());
    }

    public OwnersRequestDto toOwnersRequestDto(OwnersRequestModel model) {
        if (model == null) return null;

        OwnersRequestDto dto = new OwnersRequestDto();
        dto.setName(model.name());
        dto.setEmail(model.email());
        dto.setPhone(model.phone());
        dto.setPassword(model.password());
        return dto;
    }
}
