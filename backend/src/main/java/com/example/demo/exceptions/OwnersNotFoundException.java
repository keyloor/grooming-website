package com.example.demo.exceptions;

public class OwnersNotFoundException extends RuntimeException {

    public OwnersNotFoundException(String message) {
        super(message);
    }
}
