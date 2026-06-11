package com.example.demo.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dtos.ServicesDto;
import com.example.demo.mappers.ServicesMapper;
import com.example.demo.services.IServicesService;

@Component
public class ServicesFacade implements IServicesFacade {

    @Autowired
    IServicesService servicesService;

    @Autowired
    ServicesMapper servicesMapper;

    @Override
    public List<ServicesDto> getAll() {
        return servicesMapper.toServicioDtoList(servicesService.getAll());
    }
}