package com.example.demo.models;

public record PetsResponseModel(
        Long id,
        String name,
        String species,
        String size,
        Integer age,
        String notes,
        String breedName,
        Long ownerId) {
}
