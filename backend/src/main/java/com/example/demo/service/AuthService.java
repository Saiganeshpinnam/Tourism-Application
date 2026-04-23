package com.example.demo.service;

import com.example.demo.dto.AuthRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // ✅ SIGNUP
    public String signup(AuthRequest request) {

        if (repo.existsByEmail(request.email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.email);
        user.setPassword(encoder.encode(request.password));

        repo.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN
    public String login(AuthRequest request) {

        User user = repo.findByEmail(request.email).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not registered");
        }

        if (!encoder.matches(request.password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return "dummy-token"; // later replace with JWT
    }
}