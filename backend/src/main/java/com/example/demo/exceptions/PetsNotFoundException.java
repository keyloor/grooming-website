package com.example.demo.exceptions;

public class PetsNotFoundException extends RuntimeException {

    public PetsNotFoundException(String message) {
        super(message);
    }
}