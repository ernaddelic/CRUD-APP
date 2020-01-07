package com.example.Spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.example.Spring.model.User;
import com.example.Spring.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/users")
    public List<User> findAll() {
        return service.findAll();
    }

    @GetMapping("/admin")
    public String getAccess(HttpServletRequest request) throws AccessDeniedException {
        if (!request.isUserInRole("ADMIN")) {
            throw new AccessDeniedException("Only admin can perform this action");
        }
        return "Successful";
    }

    @GetMapping("/users/{id}")
    public User findById(@PathVariable int id) {
        return service.findById(id);
    } 

    @PostMapping("/users")
    public User save(@RequestBody User user) {
        return service.save(user);
    }

    @PutMapping("/users/{id}")
    public User editUser(@RequestBody User user, @PathVariable int id) {
        User u = service.findById(id);
        u = user;
        return service.save(u);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable int id) {
        return service.deleteUser(id);
    }   
}
