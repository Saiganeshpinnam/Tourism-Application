package com.example.demo.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // ✅ FIX: Use getServletPath()
        String path = request.getServletPath();

        // ✅ Public routes (NO TOKEN REQUIRED)
        if (
            path.startsWith("/auth") ||
            path.startsWith("/places") ||
            path.startsWith("/google") ||
            path.startsWith("/h2-console")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ Get Authorization header
        String authHeader = request.getHeader("Authorization");

        // ❌ If token missing
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Missing token");
            return;
        }

        try {
            // ✅ Extract token
            String token = authHeader.substring(7);

            // ✅ Validate token (will throw exception if invalid)
            jwtUtil.extractEmail(token);

            // ✅ Continue request
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            // ❌ Invalid token
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid token");
        }
    }
}