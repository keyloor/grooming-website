package com.example.demo.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PetsRequestModel(
        @NotBlank(message = "Name is required")
        String name,
        String species,
        String size,
        Integer age,
        String notes,
        String breedName,
        Long breedId,
        @NotNull(message = "Owner is required")
        Long ownerId) {
}
