package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.facade.IOwnersFacade;
import com.example.demo.mappers.OwnersMapper;
import com.example.demo.models.OwnersRequestModel;
import com.example.demo.models.OwnersResponseModel;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/owners")
public class OwnersController {

    @Autowired
    private IOwnersFacade ownersFacade;

    @Autowired
    private OwnersMapper ownersMapper;

    @GetMapping
    public ResponseEntity<List<OwnersResponseModel>> findAll() {
        return ResponseEntity.ok(ownersMapper.toOwnersResponseModelList(ownersFacade.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OwnersResponseModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ownersMapper.toOwnersResponseModel(ownersFacade.getById(id)));
    }

    @PostMapping
    public ResponseEntity<OwnersResponseModel> add(@Valid @RequestBody OwnersRequestModel model) {
        var dto = ownersMapper.toOwnersRequestDto(model);
        return ResponseEntity.ok(ownersMapper.toOwnersResponseModel(ownersFacade.addOwner(dto)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OwnersResponseModel> update(@PathVariable Long id, @Valid @RequestBody OwnersRequestModel model) {
        var dto = ownersMapper.toOwnersRequestDto(model);
        return ResponseEntity.ok(ownersMapper.toOwnersResponseModel(ownersFacade.updateOwner(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        ownersFacade.removeOwner(id);
        return ResponseEntity.noContent().build();
    }
}
