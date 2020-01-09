package com.example.Spring.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String fullName;
    private String email;
    private String mobile;
    private String city;
    private String gender;
    private Date hireDate;
    private Boolean isPermanent;

    public User() {
    }

    

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }


    @Override
    public boolean equals(Object obj) {
        if (obj == this)
            return true;
        if (obj == null || obj.getClass() != this.getClass())
            return false;
        return (this.id == ((User) obj).id);
    }

    @Override
    public int hashCode() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Date getHireDate() {
        return hireDate;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    public Boolean getIsPermanent() {
        return isPermanent;
    }

    public void setIsPermanent(Boolean isPermanent) {
        this.isPermanent = isPermanent;
    }

    public User(int id, 
            String fullName, 
            String email, 
            String mobile, 
            String city, 
            String gender, 
            Date hireDate,
            Boolean isPermanent) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.city = city;
        this.gender = gender;
        this.hireDate = hireDate;
        this.isPermanent = isPermanent;
    }

    public User(String fullName, String email, String mobile, String city, String gender, Date hireDate,
            Boolean isPermanent) {
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.city = city;
        this.gender = gender;
        this.hireDate = hireDate;
        this.isPermanent = isPermanent;
    }
}