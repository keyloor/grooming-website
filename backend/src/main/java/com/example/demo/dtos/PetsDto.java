package com.example.demo.dtos;

public record PetsDto(
        Long id,
        String name,
        String species,
        String size,
        Integer age,
        String notes,
        String breedName,
        Long ownerId) {
}
