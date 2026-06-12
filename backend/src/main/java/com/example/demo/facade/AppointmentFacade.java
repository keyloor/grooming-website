package com.example.demo.facade;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dtos.AppointmentDto;
import com.example.demo.dtos.AppointmentRequestDto;
import com.example.demo.mappers.AppointmentMapper;
import com.example.demo.services.IAppointmentService;

import jakarta.transaction.Transactional;

@Component
public class AppointmentFacade implements IAppointmentFacade {
    @Autowired
    private IAppointmentService appointmentService;

    @Autowired
    private AppointmentMapper appointmentMapper;

    @Override
    public List<AppointmentDto> getAll() {
        return appointmentMapper.toAppointmentDtoList(appointmentService.getAll());
    }

    @Override
    @Transactional
    public AppointmentDto addAppointment(AppointmentRequestDto appointmentDto) {
        var entity = appointmentService.addAppointment(appointmentDto);
        return appointmentMapper.toAppointmentDto(entity);
    }

    @Override
    @Transactional
    public AppointmentDto updateAppointment(UUID resourceId, AppointmentRequestDto appointmentDto) {
        var entity = appointmentService.updateAppointment(resourceId, appointmentDto);
        return appointmentMapper.toAppointmentDto(entity);
    }

    @Override
    @Transactional
    public void removeAppointment(UUID resourceId) {
        appointmentService.removeAppointment(resourceId);
    }
}