package com.example.Spring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.Spring.model.AuthenticationRequest;
import com.example.Spring.model.AuthenticationResponse;
import com.example.Spring.model.User;
import com.example.Spring.service.UserService;
import com.example.Spring.util.JwtUtil;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    private AuthenticationManager authMenager;

    @Autowired
    private UserService service;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtUtil jwtToken;
    
    @GetMapping("/users")
    public List<User> findAll() {
        return service.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> createAuthToken(@RequestBody AuthenticationRequest authRequest) throws Exception {
        try {
            authMenager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getName(), authRequest.getPassword()));   
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getName());
        final String jwt = jwtToken.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));    
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
