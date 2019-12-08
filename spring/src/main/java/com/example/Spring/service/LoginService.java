package com.example.Spring.service;

import com.example.Spring.interf.LoginInterface;
import com.example.Spring.model.Login;
import com.example.Spring.repository.LoginRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements LoginInterface {

    @Autowired
    LoginRepository loginRepository;

    @Override
    public Login findByName(String name) {
        return loginRepository.findByName(name);
    }
}