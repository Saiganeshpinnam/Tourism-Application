package com.example.demo.controller;

import com.example.demo.model.Place;
import com.example.demo.service.PlaceService;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/places")
@CrossOrigin(origins = "*")
public class PlaceController {

    private final PlaceService placeService;

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    // ✅ All places
    @GetMapping
    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }

    // ✅ Places by state
    @GetMapping("/state/{state}")
    public List<Place> getPlacesByState(@PathVariable String state) {
        String decodedState = URLDecoder.decode(state, StandardCharsets.UTF_8);
        return placeService.getPlacesByState(decodedState);
    }

    // ✅ Place by ID
    @GetMapping("/{id}")
    public Place getPlaceById(@PathVariable int id) {
        return placeService.getPlaceById(id);
    }

    // ✅ All unique states
    @GetMapping("/states")
    public List<String> getAllStates() {
        return placeService.getAllPlaces().stream()
                .map(Place::getState)
                .filter(state -> state != null && !state.isEmpty())
                .distinct()
                .sorted()
                .toList();
    }

    // ✅ Districts by state
    @GetMapping("/districts/{state}")
    public List<String> getDistrictsByState(@PathVariable String state) {

        String decodedState = URLDecoder.decode(state, StandardCharsets.UTF_8);

        return placeService.getAllPlaces().stream()
                .filter(place -> decodedState.equals(place.getState()))
                .map(Place::getName)
                .filter(d -> d != null && !d.isEmpty())
                .distinct()
                .sorted()
                .toList();
    }

    // ✅ Places by state + district
   @GetMapping("/filter")
public List<Place> getPlacesByStateAndDistrict(
        @RequestParam String state,
        @RequestParam String district
) {
    String decodedState = URLDecoder.decode(state, StandardCharsets.UTF_8);
    String decodedDistrict = URLDecoder.decode(district, StandardCharsets.UTF_8);

    return placeService.getAllPlaces().stream()
            .filter(place -> 
                decodedState.equalsIgnoreCase(place.getState()) &&
                (
                    // ✅ Case 1: district exists
                    (place.getDistrict() != null &&
                     place.getDistrict().toLowerCase()
                         .contains(decodedDistrict.toLowerCase()))
                    
                    ||

                    // ✅ Case 2: district missing → fallback to name
                    (place.getDistrict() == null &&
                     place.getName().toLowerCase()
                         .contains(decodedDistrict.toLowerCase()))
                )
            )
            .toList();
}
}