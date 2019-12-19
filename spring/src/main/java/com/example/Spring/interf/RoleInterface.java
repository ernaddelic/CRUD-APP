package com.example.Spring.interf;

import java.util.List;

import com.example.Spring.model.Role;

public interface RoleInterface {
    public List<Role> findAll();
    Role findByName(String name);
}