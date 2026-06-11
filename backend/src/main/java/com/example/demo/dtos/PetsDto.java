package com.example.demo.dtos;

public record PetsDto(
        Long id,
        String name,
        Integer age,
        String notes,
        String breedName,
        Long ownerId) {
}