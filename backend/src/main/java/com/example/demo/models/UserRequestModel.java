package com.example.demo.models;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRequestModel(
        @NotBlank(message = "El nombre es requerido")
        String name,
        @NotNull(message = "La fecha de nacimiento es requerida")
        LocalDate birthDate) {

}
