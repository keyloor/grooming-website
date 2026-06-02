package com.example.demo.dtos;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

//Lo que solicitamos para agregar un product
public class ProductRequestDto {

    private String name;
    private String description;
    private BigDecimal price;

}
