package com.example.Spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private UserService service;
    
    @GetMapping("/users")
    public List<User> findAll() {
        return service.findAll();
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
