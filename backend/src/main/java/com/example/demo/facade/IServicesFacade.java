package com.example.demo.facade;

import java.util.List;

import com.example.demo.dtos.ServicesDto;

public interface IServicesFacade {

    List<ServicesDto> getAll();
}