package com.example.demo.controller;

import com.example.demo.service.GooglePlacesService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/google")
@CrossOrigin(origins = "*")
public class GooglePlacesController {

    private final GooglePlacesService googleService;
    private final RestTemplate restTemplate;

    @Value("${google.api.key}")
    private String apiKey;

    public GooglePlacesController(GooglePlacesService googleService,
                                  RestTemplate restTemplate) {
        this.googleService = googleService;
        this.restTemplate = restTemplate;
    }

    // ✅ Nearby Places
    @GetMapping("/nearby")
    public ResponseEntity<?> getNearbyPlaces(
            @RequestParam double lat,
            @RequestParam double lng
    ) {
        try {
            String result = googleService.getNearbyPlaces(lat, lng);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("{\"results\": []}");
        }
    }

    // ✅ Search
    @GetMapping("/search")
    public ResponseEntity<?> searchPlaces(@RequestParam String query) {
        try {
            String result = googleService.getPlacesByQuery(query);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("{\"results\": []}");
        }
    }

    // ✅ Details
    @GetMapping("/details")
    public ResponseEntity<?> getPlaceDetails(@RequestParam String placeId) {
        try {
            String result = googleService.getPlaceDetails(placeId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("{\"result\": {}}");
        }
    }

    // ✅ Photo proxy
    @GetMapping("/photo")
    public ResponseEntity<byte[]> getPhoto(@RequestParam String ref) {
        try {
            String url = "https://maps.googleapis.com/maps/api/place/photo"
                    + "?maxwidth=800"
                    + "&photo_reference=" + ref
                    + "&key=" + apiKey;

            ResponseEntity<byte[]> response =
                    restTemplate.getForEntity(url, byte[].class);

            return ResponseEntity
                    .status(response.getStatusCode())
                    .header("Content-Type", "image/jpeg")
                    .body(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}