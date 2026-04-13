const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
  console.log("BASE_URL:", BASE_URL);
// ✅ Get all states (from your Spring Boot JSON)
export async function getStates() {
  const res = await fetch(`${BASE_URL}/places/states`);
  return res.json();
}

// ✅ Static places (optional fallback)
export async function getPlacesByState(state: string) {
  const res = await fetch(`${BASE_URL}/places/state/${state}`);
  return res.json();
}

// 🔥 GOOGLE API (SAFE VERSION — VERY IMPORTANT)
export async function searchGooglePlaces(query: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/google/search?query=${encodeURIComponent(query)}`
    );

    const text = await res.text();

    // ✅ Handle invalid JSON safely
    try {
      return JSON.parse(text);
    } catch {
      console.error("Invalid JSON from backend:", text);
      return { results: [] };
    }

  } catch (error) {
    console.error("Fetch error:", error);
    return { results: [] };
  }
}