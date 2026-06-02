package com.example.demo.services;

import java.util.List;
import java.util.UUID;

import com.example.demo.dtos.ProductRequestDto;
import com.example.demo.entities.Product;

public interface IProductService {

    List<Product> getAll();

    Product addProduct(ProductRequestDto productDto);

    Product updateProduct(UUID resourceId, ProductRequestDto productDto);

    Product getByResourceId(UUID resourceId);

    void removeProduct(UUID resourceId);
}
