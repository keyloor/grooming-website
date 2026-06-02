package com.example.demo.models;

import java.time.LocalDate;
import java.util.UUID;

public record UserResponseModel(
        UUID resourceId,
        String name,
        LocalDate birthDate) {

}
