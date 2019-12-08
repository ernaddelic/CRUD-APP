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

    @GetMapping("/login")
    public String loginUser(HttpServletRequest request) throws AccessDeniedException {
        if(request.isUserInRole("USER") || request.isUserInRole("ADMIN")) {
            return "Successfully logged in";
        } else {
            throw new AccessDeniedException("Invalid Credentials");
        }
    }

    @GetMapping("/users/{id}")
    public User findById(@PathVariable int id) {
        return service.findById(id);
    } 

    @PostMapping("/users")
    public List<User> save(@RequestBody User user) {
        return service.save(user);
    }

    @PutMapping("/users/{id}")
    public List<User> editUser(@RequestBody User user, @PathVariable int id) {
        User u = service.findById(id);
        u = user;
        return service.save(u);
    }

    @DeleteMapping("/users/{id}")
    public List<User> deleteUser(@PathVariable int id) {
        return service.deleteUser(id);
    }   
}
