package com.example.demo.model;

public class Place {

    private int id;
    private String name;
    private String state;
    private double latitude;
    private double longitude;
    private String description;

    // ✅ REQUIRED: Default constructor (IMPORTANT)
    public Place() {
    }

    // ✅ Parameterized constructor
    public Place(int id, String name, String state,
                 double latitude, double longitude, String description) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }

    // ✅ Getters & Setters (VERY IMPORTANT)

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}