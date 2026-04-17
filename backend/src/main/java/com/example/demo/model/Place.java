package com.example.demo.model;

public class Place {

    private int id;
    private String name;
    private String state;
    private String district; // 🔥 ADD THIS

    private double latitude;
    private double longitude;
    private String description;

    // ✅ Default constructor
    public Place() {}

    // ✅ Updated constructor (include district)
    public Place(int id, String name, String state, String district,
                 double latitude, double longitude, String description) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.district = district; // 🔥 IMPORTANT
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }

    // ✅ Getters & Setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    // 🔥 NEW (THIS FIXES YOUR ERROR)
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}