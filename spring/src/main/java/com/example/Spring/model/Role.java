package com.example.Spring.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.GenerationType;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<Login> users;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Login> getUsers() {
        return users;
    }

    public void setUsers(Set<Login> users) {
        this.users = users;
    }

    public Role() {
    }

    public Role(int id, String name, Set<Login> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }   
}