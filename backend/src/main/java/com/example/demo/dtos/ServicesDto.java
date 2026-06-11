package com.example.demo.dtos;

import java.math.BigDecimal;

public record ServicesDto(
        Integer id,
        String name,
        String description,
        BigDecimal price,
        Integer durationMin) {
}