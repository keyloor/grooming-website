package com.example.demo.facade;

import java.util.List;
import java.util.UUID;

import com.example.demo.dtos.ProductDto;
import com.example.demo.dtos.ProductRequestDto;

public interface IProductFacade {

    List<ProductDto> getAll();

    ProductDto getByResourceId(UUID resourceId);

    ProductDto addProduct(ProductRequestDto productDto);

    ProductDto updateProduct(UUID resourceId, ProductRequestDto productDto);

    void removeProduct(UUID resourceId);
}
