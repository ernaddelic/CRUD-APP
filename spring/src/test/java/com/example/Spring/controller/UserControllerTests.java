package com.example.Spring.controller;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.example.Spring.model.User;
import com.example.Spring.service.UserService;
import com.example.Spring.util.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.junit.Assert.assertThrows;
import org.hamcrest.Matchers;
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
import org.springframework.security.test.context.support.WithMockUser;
import static org.hamcrest.CoreMatchers.containsString;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTests {

    @MockBean
    JwtUtil jwtUtil;

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    UserController userController;

    @MockBean
    UserDetailsService userDetailsService;

    @MockBean
    UserService userService;

    private User u;

    @BeforeEach
    public  void setUp() {
        u = new User(1, 
        "John Smith",
        "john@hotmail.com",
        "555-999",
        "London",
        "male",
        new Date(2019, 8, 18),
        true);
        List<User> users = new ArrayList<User>();
        users.add(u);
        users.add(new User(1, 
        "Nate Smith",
        "nate@hotmail.com",
        "555-999",
        "London",
        "female",
        new Date(2019, 8, 18),
        true));
        Mockito.when(userService.deleteUser(1)).thenReturn("Deleted");
        Mockito.when(userService.findAll()).thenReturn(users);
        Mockito.when(userService.save(u)).thenReturn(u);
        Mockito.when(userService.findById(1)).thenReturn(u);
    }

    @Test
    public void testFindAll() throws Exception {
        this.mockMvc.perform(get("/users"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].fullName", Matchers.is("John Smith")))
        .andExpect(jsonPath("$[1].fullName", Matchers.is("Nate Smith")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/users/1"))
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("Deleted")));    
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testEditUser() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(put("/users/1").content(mapper.writeValueAsString(u))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.fullName", Matchers.is("John Smith")))
        .andExpect(jsonPath("$.email", Matchers.is("john@hotmail.com")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testSaveUser() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(post("/users").content(mapper.writeValueAsString(u))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.fullName", Matchers.is("John Smith")))
        .andExpect(jsonPath("$.email", Matchers.is("john@hotmail.com")));
    }

    @Test
    public void testFindById() throws Exception {
        mockMvc.perform(get("/users/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.fullName", Matchers.is("John Smith")))
        .andExpect(jsonPath("$.email", Matchers.is("john@hotmail.com")));
    }

    @Test
    @WithMockUser(roles = "USER")
    public void testGetAccess() throws Exception {
        assertThrows(AccessDeniedException.class, () -> mockMvc.perform(get("/admin")));   
    }
}