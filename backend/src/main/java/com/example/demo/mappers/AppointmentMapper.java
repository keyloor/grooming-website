package com.example.demo.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dtos.AppointmentDto;
import com.example.demo.dtos.AppointmentRequestDto;
import com.example.demo.entities.Appointment;
import com.example.demo.models.AppointmentRequestModel;
import com.example.demo.models.AppointmentResponseModel;

@Component
public class AppointmentMapper {
    public AppointmentDto toAppointmentDto(Appointment appointment) {
        if(appointment == null) {
            return null;
        }
        return new AppointmentDto(appointment.getId(), appointment.getPet().getId(),
        appointment.getService().getId(),appointment.getPersonal().getId(),appointment.getDate(),
        appointment.getStatus(),appointment.getResourceId());
    }

    public List<AppointmentDto> toAppointmentDtoList(List<Appointment> appointments) {
        if(appointments == null) {
            return null;
        }
        return appointments.stream()
        .map(this::toAppointmentDto)
        .collect(Collectors.toList());
    }

    public AppointmentResponseModel toAppointmentResponseModel(AppointmentDto appointmentDto) {
        if(appointmentDto == null) {
            return null;
        }
        return new AppointmentResponseModel(appointmentDto.petId(),
        appointmentDto.serviceId(),appointmentDto.personalId(),appointmentDto.date(),
        appointmentDto.status(),appointmentDto.resourceId());
    }

    public List<AppointmentResponseModel> toAppointmentResponseModelList(List<AppointmentDto> appointmentDtos) {
        if(appointmentDtos == null) {
            return null;
        }
        return appointmentDtos.stream()
        .map(this::toAppointmentResponseModel)
        .collect(Collectors.toList());
    }

    public AppointmentRequestDto toAppointmentRequestDto(AppointmentRequestModel appointment) {
        if(appointment == null) {
            return null;
        }
        AppointmentRequestDto appointmentDto = new AppointmentRequestDto();

        appointmentDto.setPetId(appointment.petId());
        appointmentDto.setServiceId(appointment.serviceId());
        appointmentDto.setPersonalId(appointment.personalId());
        appointmentDto.setDate(appointment.date());
        appointmentDto.setStatus(appointment.status());

        return appointmentDto;
    }
}
