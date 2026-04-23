package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // ✅ Enable CORS
            .cors(Customizer.withDefaults())

            // ✅ Disable CSRF for REST API
            .csrf(csrf -> csrf.disable())

            // ✅ Stateless JWT auth
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ✅ Route permissions
            .authorizeHttpRequests(auth -> auth

                // Public Auth APIs
                .requestMatchers(
                    "/auth/**",
                    "/api/auth/**"
                ).permitAll()

                // Public Tourism APIs
                .requestMatchers(
                    "/places/**",
                    "/google/**"
                ).permitAll()

                // H2 Console (development only)
                .requestMatchers(
                    "/h2-console/**"
                ).permitAll()

                // Everything else needs token
                .anyRequest().authenticated()
            )

            // ✅ Disable default login pages
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            // ✅ Allow H2 console iframe
            .headers(headers ->
                headers.frameOptions(frame -> frame.disable())
            )

            // ✅ JWT filter
            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}