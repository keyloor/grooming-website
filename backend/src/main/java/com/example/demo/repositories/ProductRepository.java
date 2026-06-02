package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Product;

//El Repository es la capa que habla directamente con la base de datos
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Spring Data JPA genera la implementación automáticamente por convención de nombres
    Optional<Product> findByResourceId(UUID resourceId);

    default List<Product> getAll() {
        return findAll();
    }

    default Product addProduct(Product product) {
        return save(product);
    }

    default Product updateProduct(Product product) {
        return save(product);
    }

}
