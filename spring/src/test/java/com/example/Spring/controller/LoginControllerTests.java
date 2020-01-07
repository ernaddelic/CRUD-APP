package com.example.Spring.controller;

import com.example.Spring.model.AuthenticationRequest;
import com.example.Spring.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(LoginController.class)
public class LoginControllerTests {


    @MockBean
    private AuthenticationManager auth;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    UserDetailsService userDetailsService;

    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserDetails userDetails;

    private AuthenticationRequest authFail;
    private AuthenticationRequest authSuccess;


    @BeforeEach
    public void setUp() {
        authFail = new AuthenticationRequest("user@gmail.com", "password");
        authSuccess = new AuthenticationRequest("new_user@gmail.com", "new_password");
        Mockito.when(userDetailsService.loadUserByUsername(authFail.getEmail())).thenThrow(UsernameNotFoundException.class);
        Mockito.when(userDetailsService.loadUserByUsername(authSuccess.getEmail())).thenReturn(userDetails);
        Mockito.when(jwtUtil.generateToken(userDetails)).thenReturn("JWT_TOKEN");
    }

    @Test
    public void testCreateAuthToken() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(post("/login")
        .content(mapper.writeValueAsString(authFail))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().is(401));

        mockMvc.perform(post("/login")
        .content(mapper.writeValueAsString(authSuccess))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().json("{'jwt': 'JWT_TOKEN'}"));
    }   
}