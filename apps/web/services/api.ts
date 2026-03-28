const BASE_URL = "http://localhost:8080";

export async function getPlaces() {
  const res = await fetch(`${BASE_URL}/places`);
  return res.json();
}

export async function getPlacesByState(state: string) {
  const res = await fetch(`${BASE_URL}/places/state/${state}`);
  return res.json();
}