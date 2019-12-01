package com.example.Spring;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserInterface {

    UserRepository userRepository;

    @Autowired
    public UserService(UserRepository u) {
        this.userRepository = u;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> save(User user) {
        userRepository.save(user);
        return userRepository.findAll();
    }

    @Override
    public User findById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> deleteUser(int id) {
        userRepository.deleteById(id);
        return userRepository.findAll();
    }
}