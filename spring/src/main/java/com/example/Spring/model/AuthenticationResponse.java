package com.example.Spring.model;

public class AuthenticationResponse {
    private String jwt;

    public String getJwt() {
        return jwt;
    }

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

    public AuthenticationResponse() {
    }

    

    
}