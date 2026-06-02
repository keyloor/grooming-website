package com.example.demo.models;

import java.math.BigDecimal;
import java.util.UUID;

/*
Los Models representan los datos que la API expone hacia afuera.

Aunque parecen similares a los DTO, normalmente los Models se usan 
específicamente para definir la respuesta final que verá el cliente.

Lo que requirimos mostrarle al usuario.
 */
public record ProductResponseModel(
        UUID resourceId,
        String name,
        String description,
        BigDecimal price) {

}
