package com.example.demo.facade;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dtos.ProductDto;
import com.example.demo.dtos.ProductRequestDto;
import com.example.demo.mappers.ProductMapper;
import com.example.demo.services.IProductService;

import jakarta.transaction.Transactional;

//La Facade coordina Services y Mappers. Oculta complejidad al Controller.
@Component
public class ProductFacade implements IProductFacade {

    @Autowired
    IProductService productService;

    @Autowired
    ProductMapper productMapper;

    @Override
    public List<ProductDto> getAll() {
        return productMapper.toProductDtoList(productService.getAll());
    }

    @Override
    @Transactional
    public ProductDto addProduct(ProductRequestDto productDto) {
        var entity = productService.addProduct(productDto);
        return productMapper.toProductDto(entity);
    }

    @Override
    public ProductDto updateProduct(UUID resourceId, ProductRequestDto product) {
        var entity = productService.updateProduct(resourceId, product);
        return productMapper.toProductDto(entity);
    }

    @Override
    public ProductDto getByResourceId(UUID resourceId) {
        var entity = productService.getByResourceId(resourceId);
        return productMapper.toProductDto(entity);
    }

    @Override
    @Transactional
    public void removeProduct(UUID resourceId) {
        productService.removeProduct(resourceId);
    }

}
