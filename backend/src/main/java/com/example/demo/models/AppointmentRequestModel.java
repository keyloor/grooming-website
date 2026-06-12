package com.example.demo.models;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record AppointmentRequestModel(
        @NotNull(message = "petId no puede ser nulo")
        @Positive(message = "petId debe ser un valor positivo")
        Long petId,

        @NotNull(message = "serviceId no puede ser nulo")
        @Positive(message = "serviceId debe ser un valor positivo")
        Integer serviceId,

        @NotNull(message = "personalId no puede ser nulo")
        @Positive(message = "personalId debe ser un valor positivo")
        Integer personalId,

        @NotNull(message = "date no puede ser nulo")
        LocalDate date,

        @NotBlank(message = "status no puede estar en blanco")
        String status
) {
}
