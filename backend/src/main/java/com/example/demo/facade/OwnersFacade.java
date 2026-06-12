package com.example.demo.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.dtos.OwnersDto;
import com.example.demo.dtos.OwnersRequestDto;
import com.example.demo.mappers.OwnersMapper;
import com.example.demo.services.IOwnersService;

import jakarta.transaction.Transactional;

@Component
public class OwnersFacade implements IOwnersFacade {

    @Autowired
    private IOwnersService ownersService;

    @Autowired
    private OwnersMapper ownersMapper;

    @Override
    public List<OwnersDto> getAll() {
        return ownersMapper.toOwnersDtoList(ownersService.getAll());
    }

    @Override
    public OwnersDto getById(Long id) {
        return ownersMapper.toOwnersDto(ownersService.getById(id));
    }

    @Override
    @Transactional
    public OwnersDto addOwner(OwnersRequestDto dto) {
        var entity = ownersService.addOwner(dto);
        return ownersMapper.toOwnersDto(entity);
    }

    @Override
    @Transactional
    public OwnersDto updateOwner(Long id, OwnersRequestDto dto) {
        var entity = ownersService.updateOwner(id, dto);
        return ownersMapper.toOwnersDto(entity);
    }

    @Override
    @Transactional
    public void removeOwner(Long id) {
        ownersService.removeOwner(id);
    }
}
