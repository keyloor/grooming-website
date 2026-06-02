package com.example.demo.models;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@NotBlank
@NotNull
@Positive
public record ProductRequestModel(
        @NotBlank(message = "El nombre es requerido")
        String name,
        String description,
        @NotNull(message = "El precio es requerido")
        @Positive(message = "El precio debe ser mayor a 0")
        BigDecimal price) {

}
