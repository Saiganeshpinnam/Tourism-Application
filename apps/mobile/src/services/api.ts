import axios from "axios";

// 🔥 IMPORTANT: Use your system IP (NOT localhost)
const BASE_URL = "http://192.168.29.236:8080";

// ✅ Axios instance (clean & reusable)
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// 🌍 STATES API
// ===============================
export const getStates = async () => {
  try {
    const res = await api.get("/places/states");
    return res.data;
  } catch (err: any) {
    console.error("🔥 getStates API ERROR:", err?.message || err);
    return [];
  }
};

// ===============================
// 🏙️ PLACES BY STATE (optional)
// ===============================
export const getPlacesByState = async (state: string) => {
  try {
    const res = await api.get(`/places/state/${state}`);
    return res.data;
  } catch (err: any) {
    console.error("🔥 getPlacesByState ERROR:", err?.message || err);
    return [];
  }
};

// ===============================
// 🔍 SEARCH GOOGLE PLACES
// ===============================
export const searchPlaces = async (query: string) => {
  try {
    const res = await api.get(
      `/google/search?query=${encodeURIComponent(query)}`
    );
    return res.data;
  } catch (err: any) {
    console.error("🔥 searchPlaces ERROR:", err?.message || err);
    return { results: [] };
  }
};

// ===============================
// 📍 NEARBY PLACES
// ===============================
export const getNearbyPlaces = async (lat: number, lng: number) => {
  try {
    const res = await api.get(
      `/google/nearby?lat=${lat}&lng=${lng}`
    );
    return res.data;
  } catch (err: any) {
    console.error("🔥 getNearbyPlaces ERROR:", err?.message || err);
    return { results: [] };
  }
};

// ===============================
// 📌 PLACE DETAILS
// ===============================
export const getPlaceDetails = async (placeId: string) => {
  try {
    const res = await api.get(
      `/google/details?placeId=${placeId}`
    );
    return res.data;
  } catch (err: any) {
    console.error("🔥 getPlaceDetails ERROR:", err?.message || err);
    return null;
  }
};