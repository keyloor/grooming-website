package com.example.demo.facade;

import java.util.List;
import java.util.UUID;

import com.example.demo.dtos.AppointmentDto;
import com.example.demo.dtos.AppointmentRequestDto;

public interface IAppointmentFacade {
    List<AppointmentDto> getAll();
    AppointmentDto addAppointment(AppointmentRequestDto appointmentDto);
    AppointmentDto updateAppointment(UUID resourceId, AppointmentRequestDto appointmentDto);
    void removeAppointment(UUID resourceId);
}
