package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GooglePlacesService {

    private final RestTemplate restTemplate;

    @Value("${google.api.key}")
    private String apiKey;

    public GooglePlacesService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // 🔥 1️⃣ SEARCH (tourist places / districts etc.)
    public String getPlacesByQuery(String query) {

        String url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
                + "?query=" + query
                + "&key=" + apiKey;

        return restTemplate.getForObject(url, String.class);
    }

    // 🔥 2️⃣ PLACE DETAILS (IMPORTANT)
    public String getPlaceDetails(String placeId) {

        String url = "https://maps.googleapis.com/maps/api/place/details/json"
                + "?place_id=" + placeId
                + "&key=" + apiKey;

        return restTemplate.getForObject(url, String.class);
    }
}