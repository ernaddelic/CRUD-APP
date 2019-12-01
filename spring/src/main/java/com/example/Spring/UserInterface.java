package com.example.Spring;

import java.util.List;

public interface UserInterface {
    public List<User> findAll();
    public List<User> save(User user);
    public User findById(int id);
    public List<User> deleteUser(int id);

}

