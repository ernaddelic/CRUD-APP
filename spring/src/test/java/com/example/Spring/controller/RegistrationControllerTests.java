package com.example.Spring.controller;

import com.example.Spring.model.Login;
import com.example.Spring.service.LoginService;
import com.example.Spring.service.RoleService;
import com.example.Spring.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.CoreMatchers.containsString;

@RunWith(SpringRunner.class)
@WebMvcTest(RegistrationController.class)
public class RegistrationControllerTests {

    @MockBean
    LoginService loginService;

    @MockBean
    JwtUtil jwtUtil;

    @MockBean
    UserDetailsService userDetailsService;

    @MockBean
    RoleService roleService;

    @Autowired
    MockMvc mockMvc;

    @InjectMocks
    RegistrationController registrationController;


    private Login loginSuccessful;
    private Login loginFail;

    @BeforeEach
    public void setUp()  {
        loginSuccessful = new Login("new_user@gmail.com", "new_user", "password");
        loginFail = new Login("user@gmail.com", "user", "password");
        Mockito.when(loginService.findByName(loginFail.getName())).thenReturn(loginFail);
    }
    

    @Test
    public void testRegisterUser() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(post("/register")
        .content(mapper.writeValueAsString(loginFail))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().is(401));
    
        mockMvc.perform(post("/register")
        .content(mapper.writeValueAsString(loginSuccessful))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("User Registered")));
    }
}
