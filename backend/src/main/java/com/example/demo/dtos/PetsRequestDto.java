package com.example.demo.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PetsRequestDto {

    private String name;
    private Integer age;
    private String notes;
    private Long breedId;
    private Long ownerId;
}