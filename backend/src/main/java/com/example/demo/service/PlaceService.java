package com.example.demo.service;

import com.example.demo.model.Place;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class PlaceService {

    private List<Place> places = new ArrayList<>();

    public PlaceService() {
        loadPlacesFromJson();
    }

    // 🔥 Load JSON safely
    private void loadPlacesFromJson() {
        try {
            ObjectMapper mapper = new ObjectMapper();

            InputStream is = new ClassPathResource("places.json").getInputStream();

            places = mapper.readValue(is, new TypeReference<List<Place>>() {});

            System.out.println("✅ Loaded places count: " + places.size());

        } catch (Exception e) {
            System.out.println("❌ ERROR loading JSON:");
            e.printStackTrace();

            places = new ArrayList<>();
        }
    }

    // 🔥 Get all places
    public List<Place> getAllPlaces() {
        return places;
    }

    // 🔥 Get places by state (FINAL FIXED VERSION)
    public List<Place> getPlacesByState(String state) {

        // Decode URL (handles spaces like Uttar%20Pradesh)
        String decodedState = URLDecoder.decode(state, StandardCharsets.UTF_8);

        String input = decodedState.trim().toLowerCase();

        System.out.println("🔍 Searching for state: " + input);

        List<Place> result = places.stream()
                .filter(p ->
                        p.getState() != null &&
                        p.getState().trim().toLowerCase().equals(input)
                )
                .toList();

        System.out.println("✅ Found places: " + result.size());

        return result;
    }

    // 🔥 Get place by ID
    public Place getPlaceById(int id) {
        return places.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElse(null);
    }
}