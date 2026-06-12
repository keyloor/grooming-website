package com.example.demo.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.AppointmentDto;
import com.example.demo.facade.IAppointmentFacade;
import com.example.demo.mappers.AppointmentMapper;
import com.example.demo.models.AppointmentRequestModel;
import com.example.demo.models.AppointmentResponseModel;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private IAppointmentFacade appointmentFacade;
    @Autowired
    private AppointmentMapper appointmentMapper;

    @GetMapping
    public ResponseEntity<List<AppointmentResponseModel>> findAll() {
        return ResponseEntity.ok(appointmentMapper.toAppointmentResponseModelList(appointmentFacade.getAll()));
    }

    @PostMapping
    public AppointmentDto save(@RequestBody AppointmentRequestModel appointment) {
        var appointmentDto = appointmentMapper.toAppointmentRequestDto(appointment);
        return appointmentFacade.addAppointment(appointmentDto);
    }

    @PutMapping(path = "/{resourceId}")
    public AppointmentDto update(@PathVariable("resourceId") UUID resourceId,
    @RequestBody AppointmentRequestModel appointment) {
        var appointmentDto = appointmentMapper.toAppointmentRequestDto(appointment);
        return appointmentFacade.updateAppointment(resourceId, appointmentDto);
    }

    @DeleteMapping(path = "/{resourceId}")
    public void remove (@PathVariable("resourceId") UUID resourceId) {
        appointmentFacade.removeAppointment(resourceId);
    }
}
