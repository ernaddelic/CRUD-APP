package com.example.Spring.service;

import java.util.List;

import com.example.Spring.interf.RoleInterface;
import com.example.Spring.model.Role;
import com.example.Spring.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements RoleInterface {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    
    
}