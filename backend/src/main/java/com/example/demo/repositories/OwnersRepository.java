package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Owners;

@Repository
public interface OwnersRepository extends JpaRepository<Owners, Long> {
}