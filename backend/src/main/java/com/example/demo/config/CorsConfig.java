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

                        // ✅ Allow ALL dev environments (best for now)
                        .allowedOriginPatterns("*")

                        // OR if you want strict control, use this instead:
                        /*
                        .allowedOrigins(
                                "http://localhost:3000",
                                "http://127.0.0.1:3000",
                                "http://localhost:8081",
                                "http://127.0.0.1:8081"
                        )
                        */

                        // ✅ Allow all HTTP methods
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")

                        // ✅ Allow all headers
                        .allowedHeaders("*")

                        // ✅ Expose headers if needed
                        .exposedHeaders("*")

                        // ✅ Important for cookies/auth (keep false for now)
                        .allowCredentials(false)

                        // ✅ Cache preflight response
                        .maxAge(3600);
            }
        };
    }
}