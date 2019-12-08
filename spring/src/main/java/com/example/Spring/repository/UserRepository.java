package com.example.Spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Spring.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}