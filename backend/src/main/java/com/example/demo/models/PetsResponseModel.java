package com.example.demo.models;

public record PetsResponseModel(
        Long id,
        String name,
        Integer age,
        String notes,
        String breedName,
        Long ownerId) {
}