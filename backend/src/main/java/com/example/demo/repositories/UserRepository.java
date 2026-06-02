package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByResourceId(UUID resourceId);

    default List<User> getAll() {
        return findAll();
    }

    default User addUser(User user) {
        return save(user);
    }

    default User updateUser(User user) {
        return save(user);
    }

}
