package com.example.demo.models;

import java.math.BigDecimal;

public record ServicesResponseModel(
        Integer id,
        String name,
        String description,
        BigDecimal price,
        Integer durationMin) {
}