package com.example.demo.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.AppointmentRequestDto;
import com.example.demo.entities.Appointment;
import com.example.demo.exceptions.AppointmentNotFoundException;
import com.example.demo.repositories.AppointmentRepository;
import com.example.demo.repositories.PersonalRepository;
import com.example.demo.repositories.PetsRepository;
import com.example.demo.repositories.ServicesRepository;

@Service
public class AppointmentService implements IAppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    PetsRepository petsRepository;

    @Autowired
    ServicesRepository servicesRepository;

    @Autowired
    PersonalRepository personalRepository;

    @Override
    public List<Appointment> getAll() {
        return appointmentRepository.getAll();
    }

    @Override
    public Appointment addAppointment(AppointmentRequestDto appointmentDto) {
        var pet = petsRepository.findById(appointmentDto.getPetId())
            .orElseThrow(() -> new IllegalArgumentException("Mascota no encontrada"));
        var service = servicesRepository.findById(appointmentDto.getServiceId())
            .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));
        var personal = personalRepository.findById(appointmentDto.getPersonalId())
            .orElseThrow(() -> new IllegalArgumentException("Personal no encontrado"));
        var appointment = Appointment.builder()
            .pet(pet)
            .service(service)
            .personal(personal)
            .date(appointmentDto.getDate())
            .status(appointmentDto.getStatus())
            .resourceId(UUID.randomUUID())
            .build();
        return appointmentRepository.addAppointment(appointment);
    }

    @Override
    public Appointment updateAppointment(UUID resourceId, AppointmentRequestDto appointmentDto) {
        var appointment = appointmentRepository.findByResourceId(resourceId)
        .orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));
        appointment.setDate(appointmentDto.getDate());
        appointment.setStatus(appointmentDto.getStatus());
        var pet = petsRepository.findById(appointmentDto.getPetId())
            .orElseThrow(() -> new IllegalArgumentException("Mascota no encontrada"));
        var service = servicesRepository.findById(appointmentDto.getServiceId())
            .orElseThrow(() -> new IllegalArgumentException("Servicio no encontrado"));
        var personal = personalRepository.findById(appointmentDto.getPersonalId())
            .orElseThrow(() -> new IllegalArgumentException("Personal no encontrado"));
        appointment.setPet(pet);
        appointment.setService(service);
        appointment.setPersonal(personal);
        return appointmentRepository.updateAppointment(appointment);
    }

    @Override
    public void removeAppointment(UUID resourceId) {
        var appointment = appointmentRepository.findByResourceId(resourceId)
        .orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));
        appointmentRepository.delete(appointment);
    }

    @Override
    public Appointment getByResourceId(UUID resourceId) {
        return appointmentRepository.findByResourceId(resourceId)
        .orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));
    }


}
