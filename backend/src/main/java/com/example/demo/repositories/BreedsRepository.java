package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Breeds;

@Repository
public interface BreedsRepository extends JpaRepository<Breeds, Long> {

    Optional<Breeds> findByNameIgnoreCase(String name);
}
