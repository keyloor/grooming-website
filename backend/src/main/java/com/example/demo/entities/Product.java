package com.example.demo.entities;

import java.math.BigDecimal;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity // Spring entiende que esta clase debe mapearse a una tabla.
@Table(name = "product") // el nombre de la tabla en la base de datos.

// Lombok genera automáticamente métodos como get y set al compilar por eso no
// se escriben manualmente, si no se tuvieran las anotaciones de Lombok, se
// deberían escribir manualmente los métodos get y set para cada atributo.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

// Representa una tabla de la base de datos.
public class Product {

    @Id // llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100) //Columnas
    private String name;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(name = "resource_id", nullable = false, length = 36, unique = true)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private UUID resourceId;

}
