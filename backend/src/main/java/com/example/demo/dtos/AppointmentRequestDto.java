package com.example.demo.dtos;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequestDto {
    private Long petId;
    private Integer serviceId;
    private Integer personalId;
    private LocalDate date;
    private String status;
}
