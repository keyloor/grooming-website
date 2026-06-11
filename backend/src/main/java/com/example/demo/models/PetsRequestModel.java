package com.example.demo.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PetsRequestModel(
        @NotBlank(message = "Name is required")
        String name,
        @NotNull(message = "Age is required")
        Integer age,
        String notes,
        Long breedId,
        @NotNull(message = "Owner is required")
        Long ownerId) {
}