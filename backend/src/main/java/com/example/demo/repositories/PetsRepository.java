package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Pets;

@Repository
public interface PetsRepository extends JpaRepository<Pets, Long> {

    List<Pets> findByOwnerId(Long ownerId);

    default List<Pets> getAll() {
        return findAll();
    }

    default Pets addPets(Pets pets) {
        return save(pets);
    }

    default Pets updatePets(Pets pets) {
        return save(pets);
    }
}