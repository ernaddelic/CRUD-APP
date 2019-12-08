package com.example.Spring.interf;

import java.util.List;
import com.example.Spring.model.User;

public interface UserInterface {
    public List<User> findAll();
    public List<User> save(User user);
    public User findById(int id);
    public List<User> deleteUser(int id);

}

