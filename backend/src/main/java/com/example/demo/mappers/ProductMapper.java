package com.example.demo.mappers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.example.demo.dtos.ProductDto;
import com.example.demo.dtos.ProductRequestDto;
import com.example.demo.entities.Product;
import com.example.demo.models.ProductRequestModel;
import com.example.demo.models.ProductResponseModel;

//El Mapper convierte objetos entre: Entity ↔ DTO
@Component
public class ProductMapper {

    public ProductDto toProductDto(Product product) {
        if (product == null) {
            return null;
        }

        return new ProductDto(product.getResourceId(), product.getName(), product.getDescription(), product.getPrice());
    }

    public List<ProductDto> toProductDtoList(List<Product> products) {
        if (products == null) {
            return null;
        }

        return products.stream()
                .map(this::toProductDto)
                .collect(Collectors.toList());
    }

    public ProductResponseModel tProductResponseModel(ProductDto productDto) {
        if (productDto == null) {
            return null;
        }

        return new ProductResponseModel(productDto.resource_id(), productDto.name(), productDto.description(), productDto.price());
    }

    public List<ProductResponseModel> toProductResponseModelList(List<ProductDto> productDtos) {
        if (productDtos == null) {
            return null;
        }

        return productDtos.stream()
                .map(this::tProductResponseModel)
                .collect(Collectors.toList());
    }

    public ProductRequestDto toProductRequestDto(ProductRequestModel product) {
        if (product == null) {
            return null;
        }
        ProductRequestDto productDto = new ProductRequestDto();
        productDto.setName(product.name());
        productDto.setDescription(product.description());
        productDto.setPrice(product.price());
        return productDto;
    }

}
