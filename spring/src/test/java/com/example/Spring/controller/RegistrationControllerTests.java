package com.example.Spring.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;
import java.net.URISyntaxException;

import com.example.Spring.model.Login;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class RegistrationControllerTests {

    @LocalServerPort
    int randomPort;

    private String url;
    private URI uri;
    private RestTemplate template;

    @BeforeEach
    public void setUp() throws URISyntaxException {
        url = "http://localhost:" + randomPort + "/user-portal/register/";
        uri = new URI(url);
        template = new RestTemplate();
    }
    
    @Test
    public void registerUserTest() throws Exception {
        Login login = new Login("new user", "new password");
        HttpEntity<Login> request = new HttpEntity<Login>(login);
        ResponseEntity<String> response = template.exchange(uri, HttpMethod.POST, request, String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User Registered", response.getBody());
    }
}
