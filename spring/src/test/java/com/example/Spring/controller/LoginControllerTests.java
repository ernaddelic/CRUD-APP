package com.example.Spring.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.net.URI;
import java.net.URISyntaxException;
import com.example.Spring.model.AuthenticationRequest;
import com.example.Spring.model.AuthenticationResponse;
import com.example.Spring.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class LoginControllerTests {

    @LocalServerPort
    int randomPort;

    @Autowired
    LoginController loginController;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtUtil jwtUtil;

    private String url;
    private URI uri;
    private RestTemplate template;

    @BeforeEach
    public void setUp() throws URISyntaxException {
        url = "http://localhost:" + randomPort + "/user-portal/login/";
        uri = new URI(url);
        template = new RestTemplate();
    }

    @Test
    public void createAuthTokenTest() throws Exception {
        AuthenticationRequest authRequest = new AuthenticationRequest("admin@gmail.com", "adminadmin");
        HttpEntity<AuthenticationRequest> request = new HttpEntity<AuthenticationRequest>(authRequest);
        ResponseEntity<AuthenticationResponse> response = template.exchange(uri, HttpMethod.POST, request, AuthenticationResponse.class);
        UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        String jwt = jwtUtil.generateToken(userDetails);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(jwt, response.getBody().getJwt());
    }
}