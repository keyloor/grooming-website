package com.example.demo.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dtos.ServicesDto;
import com.example.demo.entities.Services;
import com.example.demo.models.ServicesResponseModel;

@Component
public class ServicesMapper {

    public ServicesDto toServicioDto(Services servicio) {
        if (servicio == null) return null;

        return new ServicesDto(
                servicio.getId(),
                servicio.getName(),
                servicio.getDescription(),
                servicio.getPrice(),
                servicio.getDurationMin());
    }

    public List<ServicesDto> toServicioDtoList(List<Services> servicios) {
        if (servicios == null) return null;

        return servicios.stream()
                .map(this::toServicioDto)
                .collect(Collectors.toList());
    }

    public ServicesResponseModel toServicioResponseModel(ServicesDto dto) {
        if (dto == null) return null;

        return new ServicesResponseModel(
                dto.id(),
                dto.name(),
                dto.description(),
                dto.price(),
                dto.durationMin());
    }

    public List<ServicesResponseModel> toServicioResponseModelList(List<ServicesDto> dtos) {
        if (dtos == null) return null;

        return dtos.stream()
                .map(this::toServicioResponseModel)
                .collect(Collectors.toList());
    }
}