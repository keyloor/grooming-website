package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
    Optional<Appointment> findByResourceId(UUID resourceId);

    default List<Appointment> getAll() {
        return findAll();
    }

    default Appointment addAppointment(Appointment appointment) {
        return save(appointment);
    }

    default Appointment updateAppointment(Appointment appointment) {
        return save(appointment);
    }

}
