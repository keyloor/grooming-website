package com.example.demo.services;

import java.util.List;
import java.util.UUID;

import com.example.demo.dtos.AppointmentRequestDto;
import com.example.demo.entities.Appointment;

public interface IAppointmentService {
    List<Appointment> getAll();
    
    Appointment addAppointment(AppointmentRequestDto appointmentDto);
    Appointment  updateAppointment (UUID resourceId, AppointmentRequestDto appointmentDto);
    void removeAppointment(UUID resourceId);
    Appointment getByResourceId(UUID resourceId);
}
