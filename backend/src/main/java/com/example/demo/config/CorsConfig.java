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

                        // ✅ Allow your frontend URLs
                        .allowedOrigins(
                                "http://localhost:3000",
                                "http://127.0.0.1:3000"
                        )

                        // ✅ Allow all HTTP methods
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")

                        // ✅ Allow all headers
                        .allowedHeaders("*")

                        // ✅ Important for modern browsers
                        .allowCredentials(false);
            }
        };
    }
}