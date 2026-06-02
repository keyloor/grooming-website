package com.example.demo.dtos;

import java.time.LocalDate;
import java.util.UUID;

public record UserDto(
        UUID resourceId,
        String name,
        LocalDate birthDate) {

}
