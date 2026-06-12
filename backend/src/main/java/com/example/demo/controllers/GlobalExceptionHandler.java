package com.example.demo.controllers;

import org.springframework.dao.DataIntegrityViolationException;
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

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorDto> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        String message = "Data integrity violation";
        if (ex.getMostSpecificCause() != null && ex.getMostSpecificCause().getMessage() != null) {
            String causeMsg = ex.getMostSpecificCause().getMessage().toLowerCase();
            if (causeMsg.contains("email") && (causeMsg.contains("unique") || causeMsg.contains("duplicate") || causeMsg.contains("constraint"))) {
                message = "El email ya existe";
            } else {
                message = ex.getMostSpecificCause().getMessage();
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorDto(400, message));
    }
}
