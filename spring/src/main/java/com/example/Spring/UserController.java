package com.example.Spring;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class UserController {

    @Autowired
    private UserService service;
    
    @GetMapping("/")
    public String welcome() {
    	return "welcome";
    }

    @GetMapping("/users")
    public List<User> findAll() {
        return service.findAll();
    }
    
    @GetMapping("/users/{id}")
    public User findById(@PathVariable int id) {
        return service.findById(id);
    } 

    @PostMapping("/users")
    public List<User> save(@RequestBody Map<String, String> body) {
        int id = Integer.parseInt(body.get("id"));
        String firstName = body.get("firstName");
        String lastName = body.get("lastName");
        int age = Integer.parseInt(body.get("age"));
        User user = new User(id, firstName, lastName, age);
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
