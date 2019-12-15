package com.example.Spring.interf;

import java.util.List;
import com.example.Spring.model.User;

public interface UserInterface {
    public List<User> findAll();
    public User save(User user);
    public User findById(int id);
    public String deleteUser(int id);

}

