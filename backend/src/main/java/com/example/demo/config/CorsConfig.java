package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")

                        // ✅ Allow mobile (Expo), web, and local dev
                        .allowedOriginPatterns(
                                "*"
                                // 👉 Later (production), replace with:
                                // "https://yourdomain.com",
                                // "http://localhost:3000"
                        )

                        // ✅ Allow all common HTTP methods
                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS"
                        )

                        // ✅ Allow all headers
                        .allowedHeaders("*")

                        // ✅ Expose headers (for JWT later)
                        .exposedHeaders("Authorization")

                        // ❗ Keep false for now (we use token, not cookies)
                        .allowCredentials(false)

                        // ✅ Cache preflight (improves performance)
                        .maxAge(3600);
            }
        };
    }
}