import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:8080"
    : "http://192.168.29.236:8080";

async function safeFetch(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Request failed");
    return res;
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return null;
  }
}

// ✅ STATES
export async function getStates() {
  const res = await safeFetch(`${BASE_URL}/places/states`);
  if (!res) return [];
  return res.json();
}

// ✅ PLACES BY STATE (MAIN SOURCE)
export async function getPlacesByState(state: string) {
  const res = await safeFetch(
    `${BASE_URL}/places/state/${encodeURIComponent(state)}`
  );
  if (!res) return [];
  return res.json();
}

// ✅ PLACE DETAILS
export async function getPlaceById(id: number) {
  const res = await safeFetch(`${BASE_URL}/places/${id}`);
  if (!res) return null;
  return res.json();
}


// 🔍 GOOGLE SEARCH
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

// 📍 GOOGLE DETAILS
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

// 📸 PHOTO URL (REQUIRED)
export function getPhotoUrl(ref: string) {
  return `${BASE_URL}/google/photo?ref=${ref}`;
}

// =========================
// 📍 NEARBY PLACES (FIX)
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