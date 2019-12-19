package com.example.Spring.interf;

import com.example.Spring.model.Login;

public interface LoginInterface {
    public Login findByName(String name);
    public Login save(Login l);
    public Login findyByPassword(String password);
}