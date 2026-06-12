package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.OwnersRequestDto;
import com.example.demo.entities.Owners;
import com.example.demo.exceptions.OwnersNotFoundException;
import com.example.demo.repositories.OwnersRepository;

@Service
public class OwnersService implements IOwnersService {

    @Autowired
    private OwnersRepository ownersRepository;

    @Override
    public List<Owners> getAll() {
        return ownersRepository.getAll();
    }

    @Override
    public Owners getById(Long id) {
        return ownersRepository.findById(id)
                .orElseThrow(() -> new OwnersNotFoundException("Usuario no encontrado"));
    }

    @Override
    public Owners addOwner(OwnersRequestDto dto) {
        if (ownersRepository.existsByEmail(dto.getEmail())) {
            throw new DataIntegrityViolationException("Este email ya se encuentra registrado");
        }

        Owners owner = new Owners();
        owner.setName(dto.getName());
        owner.setEmail(dto.getEmail());
        owner.setPhone(dto.getPhone());
        owner.setPassword(dto.getPassword());
        return ownersRepository.addOwners(owner);
    }

    @Override
    public Owners updateOwner(Long id, OwnersRequestDto dto) {
        var owner = ownersRepository.findById(id)
                .orElseThrow(() -> new OwnersNotFoundException("Usuario no encontrado"));

        owner.setName(dto.getName());
        owner.setEmail(dto.getEmail());
        owner.setPhone(dto.getPhone());
        owner.setPassword(dto.getPassword());

        return ownersRepository.updateOwners(owner);
    }

    @Override
    public void removeOwner(Long id) {
        var owner = ownersRepository.findById(id)
                .orElseThrow(() -> new OwnersNotFoundException("Usuario no encontrado"));
        ownersRepository.delete(owner);
    }
}
