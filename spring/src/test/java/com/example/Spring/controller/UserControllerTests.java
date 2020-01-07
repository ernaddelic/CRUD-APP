package com.example.Spring.controller;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
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
import org.springframework.http.ResponseEntity;
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
        u = new User(1, "John", "Smith", 23);
        List<User> users = new ArrayList<User>();
        users.add(new User(1, "John", "Smith", 23));
        users.add(new User(2, "Nate", "Murray", 26));
        Mockito.when(userService.deleteUser(1)).thenReturn("Deleted");
        Mockito.when(userService.findAll()).thenReturn(users);
        Mockito.when(userService.save(u)).thenReturn(u);
        Mockito.when(userService.findById(1)).thenReturn(u);
    }

    @Test
    public void testGetAll() throws Exception {
        this.mockMvc.perform(get("/users"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[0].firstName", Matchers.is("John")))
        .andExpect(jsonPath("$[1].firstName", Matchers.is("Nate")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testDelete() throws Exception {
        mockMvc.perform(delete("/users/1"))
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("Deleted")));    
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testPut() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(put("/users/1").content(mapper.writeValueAsString(u))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName", Matchers.is("John")))
        .andExpect(jsonPath("$.lastName", Matchers.is("Smith")))
        .andExpect(jsonPath("$.age", Matchers.is(23)));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testPost() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(post("/users").content(mapper.writeValueAsString(u))
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName", Matchers.is("John")))
        .andExpect(jsonPath("$.lastName", Matchers.is("Smith")))
        .andExpect(jsonPath("$.age", Matchers.is(23)));
    }

    @Test
    public void testFindById() throws Exception {
        mockMvc.perform(get("/users/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName", Matchers.is("John")))
        .andExpect(jsonPath("$.lastName", Matchers.is("Smith")))
        .andExpect(jsonPath("$.age", Matchers.is(23)));
    }

    @Test
    @WithMockUser(roles = "USER")
    public void testGetAccess() throws Exception {
        assertThrows(AccessDeniedException.class, () -> mockMvc.perform(get("/admin")));   
    }
}