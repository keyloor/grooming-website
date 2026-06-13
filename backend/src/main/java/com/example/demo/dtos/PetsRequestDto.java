package com.example.demo.dtos;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PetsRequestDto {

    private String name;
    private String species;
    private String size;
    private Integer age;
    private String notes;
    private String breedName;
    private Long breedId;
    private Long ownerId;
}
