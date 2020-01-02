package com.example.Spring.controller;

import java.util.HashSet;
import com.example.Spring.model.Login;
import com.example.Spring.service.LoginService;
import com.example.Spring.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class RegistrationController {

    @Autowired
    LoginService loginService;

    @Autowired
    RoleService roleService;

    @Autowired
    BCryptPasswordEncoder encoder;

  
    @PostMapping("/register")
    public String registerUser(@RequestBody Login l) throws Exception {
        if (loginService.findByName(l.getName()) != null || 
        loginService.findByEmail(l.getEmail()) != null) {
            throw new Exception("Account already Exists!");
        }
        l.setRoles(new HashSet<>());
        l.getRoles().add(roleService.findByName("ROLE_USER"));
        l.setPassword(encoder.encode(l.getPassword()));
        loginService.save(l);
        return "User Registered";
    }
}