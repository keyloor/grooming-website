package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.facade.IServicesFacade;
import com.example.demo.mappers.ServicesMapper;
import com.example.demo.models.ServicesResponseModel;

@RestController
@RequestMapping("/api/services")
public class ServicesController {

    @Autowired
    private IServicesFacade servicesFacade;

    @Autowired
    private ServicesMapper servicesMapper;

    @GetMapping
    public ResponseEntity<List<ServicesResponseModel>> findAll() {
        return ResponseEntity.ok(
                servicesMapper.toServicioResponseModelList(servicesFacade.getAll()));
    }
}