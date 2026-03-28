package com.example.demo.controller;

import com.example.demo.model.Place;
import com.example.demo.service.PlaceService;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/places")
@CrossOrigin(origins = "*") // ✅ Allow frontend requests
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    // ✅ Get all places
    @GetMapping
    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    // ✅ Get places by state (FIXED for spaces & encoding)
    @GetMapping("/state/{state}")
    public List<Place> getPlacesByState(@PathVariable String state) {

        // Decode URL (handles "Uttar%20Pradesh")
        String decodedState = URLDecoder.decode(state, StandardCharsets.UTF_8);

        return placeService.getPlacesByState(decodedState);
    }

    // ✅ Get place by ID
    @GetMapping("/{id}")
    public Place getPlaceById(@PathVariable int id) {
        return placeService.getPlaceById(id);
    }

    // 🔥 NEW API — Get all unique states
    @GetMapping("/states")
    public List<String> getAllStates() {
        return placeService.getAllPlaces().stream()
                .map(Place::getState)
                .filter(state -> state != null && !state.isEmpty())
                .distinct()
                .sorted()
                .toList();
    }
}