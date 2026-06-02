package com.example.demo.dtos;

import java.math.BigDecimal;
import java.util.UUID;

// Los DTO transportan información entre capas sin exponer directamente la Entity.
public record ProductDto(
        UUID resource_id,
        String name,
        String description,
        BigDecimal price) {

}
