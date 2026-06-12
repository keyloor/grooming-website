package com.example.demo.dtos;

import java.time.LocalDate;
import java.util.UUID;

public record AppointmentDto(
                        Long id,
                        Long petId,
                        Integer serviceId,
                        Integer personalId,
                        LocalDate date,
                        String status,
                        UUID resourceId) {

}