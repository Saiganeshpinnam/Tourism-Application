const BASE_URL = "/api";

// helper
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

// states
export async function getStates() {
  const res = await safeFetch(`${BASE_URL}/places/states`);
  if (!res) return [];
  return res.json();
}

// search
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

// get nearby places
export async function getNearbyPlaces(lat: number, lng: number) {
  const res = await fetch(
    `/api/google/nearby?lat=${lat}&lng=${lng}`
  );

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return { results: [] };
  }
}