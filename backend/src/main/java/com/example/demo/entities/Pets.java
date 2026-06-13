package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Owners owner;

    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breeds breed;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "species", length = 50)
    private String species;

    @Column(name = "size", length = 50)
    private String size;

    @Column(name = "age")
    private Integer age;

    @Column(name = "notes", length = 255)
    private String notes;
}