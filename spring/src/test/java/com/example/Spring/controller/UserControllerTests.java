package com.example.Spring.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import com.example.Spring.model.User;
import com.example.Spring.service.UserService;
import com.example.Spring.util.JwtUtil;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserControllerTests {

    @LocalServerPort
    int randomPort;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    private String url;
    private User u;
    private RestTemplate template;
    private HttpHeaders headers;

    @BeforeEach
    public  void setUp() {
        url = "http://localhost:" + randomPort + "/user-portal/users/";
        u = new User("John", "Smith", 23);
        template = new RestTemplate();
        headers = new HttpHeaders();
        UserDetails userDetails = userDetailsService.loadUserByUsername("admin@gmail.com");
        String jwt = jwtUtil.generateToken(userDetails);
        headers.add("Authorization", 
        "Bearer " + jwt);
    }
    
    @Test
    public void testPostUser() throws URISyntaxException {
        URI uri = new URI(url);
        HttpEntity<User> request = new HttpEntity<User>(u, headers);
        ResponseEntity<User> response = template.postForEntity(uri, request, User.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("John", response.getBody().getFirstName());
    }

    @Test
    public void testGetUserById() throws URISyntaxException {
        URI uri = new URI(url + 2);
        HttpEntity<User> request = new HttpEntity<User>(null, headers);
        ResponseEntity<User> response = template.exchange(uri, HttpMethod.GET, request, User.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        User user = userService.findById(2);
        assertEquals(user, response.getBody());
    }

    @Test
    public void testDeleteUser() throws URISyntaxException {
        URI uri = new URI(url + 2);
        HttpEntity<User> request = new HttpEntity<User>(null, headers);
        ResponseEntity<String> response = template.exchange(uri, HttpMethod.DELETE, request, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Deleted", response.getBody());
    }

    @Test
    public void testFindAll() throws URISyntaxException {
        URI uri = new URI(url);
        HttpEntity<User> request = new HttpEntity<User>(null, headers);
        ResponseEntity<List<User>> response = template.exchange(uri, HttpMethod.GET, request, 
        new ParameterizedTypeReference<List<User>>() {});
        List<User> users = userService.findAll();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
    }
}