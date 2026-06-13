package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.facade.IPetsFacade;
import com.example.demo.mappers.PetsMapper;
import com.example.demo.models.PetsRequestModel;
import com.example.demo.models.PetsResponseModel;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pets")
public class PetsController {

    @Autowired
    private IPetsFacade petsFacade;

    @Autowired
    private PetsMapper petsMapper;

    @GetMapping
    public ResponseEntity<List<PetsResponseModel>> findAll() {
        return ResponseEntity.ok(petsMapper.toPetsResponseModelList(petsFacade.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetsResponseModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(petsMapper.toPetsResponseModel(petsFacade.getById(id)));
    }

    @PostMapping
    public ResponseEntity<PetsResponseModel> add(@Valid @RequestBody PetsRequestModel petsRequestModel) {
        var dto = petsMapper.toPetsRequestDto(petsRequestModel);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(petsMapper.toPetsResponseModel(petsFacade.addPets(dto)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetsResponseModel> update(@PathVariable Long id,
            @Valid @RequestBody PetsRequestModel petsRequestModel) {
        var dto = petsMapper.toPetsRequestDto(petsRequestModel);
        return ResponseEntity.ok(petsMapper.toPetsResponseModel(petsFacade.updatePets(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        petsFacade.removePets(id);
        return ResponseEntity.noContent().build();
    }
}