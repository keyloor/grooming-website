package com.example.demo.models;

import java.time.LocalDate;
import java.util.UUID;

public record AppointmentResponseModel(
    Long petId,
    Integer serviceId,
    Integer personalId,
    LocalDate date,
    String status,
    UUID resourceId) {

}
