package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Owners;

@Repository
public interface OwnersRepository extends JpaRepository<Owners, Long> {

	boolean existsByEmail(String email);

	default java.util.List<Owners> getAll() {
		return findAll();
	}

	default Owners addOwners(Owners owners) {
		return save(owners);
	}

	default Owners updateOwners(Owners owners) {
		return save(owners);
	}
}