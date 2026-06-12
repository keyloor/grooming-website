package com.example.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.demo.dtos.ErrorDto;
import com.example.demo.exceptions.AppointmentNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppointmentNotFoundException.class)
    public ResponseEntity<ErrorDto> handleAppointmentNotFoundException(AppointmentNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorDto(404, ex.getMessage()));
    }
}
