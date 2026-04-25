import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const BASE_URL = "http://16.112.64.144:8080";
const BASE_URL = "http://localhost:8080";

// 🔒 COMMON FETCH WITH JWT
async function safeFetch(url: string) {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        console.warn("🔒 Unauthorized - Token missing/expired");
      }
      throw new Error("Request failed");
    }

    return res;
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return null;
  }
}

// =========================
// ✅ STATES
// =========================
export async function getStates() {
  const res = await safeFetch(`${BASE_URL}/places/states`);
  if (!res) return [];
  return res.json();
}

// =========================
// ✅ PLACES BY STATE
// =========================
export async function getPlacesByState(state: string) {
  const res = await safeFetch(
    `${BASE_URL}/places/state/${encodeURIComponent(state)}`
  );
  if (!res) return [];
  return res.json();
}

// =========================
// ✅ PLACE DETAILS
// =========================
export async function getPlaceById(id: number) {
  const res = await safeFetch(`${BASE_URL}/places/${id}`);
  if (!res) return null;
  return res.json();
}

// =========================
// 🔍 GOOGLE SEARCH
// =========================
export async function searchGooglePlaces(query: string) {
  const res = await safeFetch(
    `${BASE_URL}/google/search?query=${encodeURIComponent(query)}`
  );

  if (!res) return { results: [] };

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return { results: [] };
  }
}

// =========================
// 📍 GOOGLE DETAILS
// =========================
export async function getPlaceDetails(placeId: string) {
  const res = await safeFetch(
    `${BASE_URL}/google/details?placeId=${placeId}`
  );

  if (!res) return { result: {} };

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return { result: {} };
  }
}

// =========================
// 📸 PHOTO URL
// =========================
export function getPhotoUrl(ref: string) {
  return `${BASE_URL}/google/photo?ref=${ref}`;
}

// =========================
// 📍 NEARBY PLACES
// =========================
export async function getNearbyPlaces(lat: number, lng: number) {
  const res = await safeFetch(
    `${BASE_URL}/google/nearby?lat=${lat}&lng=${lng}`
  );

  if (!res) return { results: [] };

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return { results: [] };
  }
}