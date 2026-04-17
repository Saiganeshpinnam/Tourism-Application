const BASE_URL = "http://192.168.29.236:8080"; // your backend IP

export const getStates = async () => {
  const res = await fetch(`${BASE_URL}/states`);
  return res.json();
};

export const getDistricts = async (state: string) => {
  const res = await fetch(`${BASE_URL}/districts/${state}`);
  return res.json();
};

export const getPlaces = async (state: string, district: string) => {
  const res = await fetch(`${BASE_URL}/places/${state}/${district}`);
  return res.json();
};

export const getPlaceById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/place/${id}`);
  return res.json();
};