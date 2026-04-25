import { Platform } from "react-native";

// ✅ Base URL
//const BASE_URL = "http://16.112.64.144:8080/auth";
const BASE_URL = "http://localhost:8080/auth";

// 🔒 Safe fetch (FIXED)
async function safeFetch(url: string, options: RequestInit) {
  try {
    const res = await fetch(url, options);

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    // ✅ IMPORTANT: always return message if error
    if (!res.ok) {
      return {
        token: null,
        message: data.message || "Something went wrong",
      };
    }

    return data;
  } catch (error) {
    console.error("🔥 API ERROR:", error);
    return {
      token: null,
      message: "Network error",
    };
  }
}

// ✅ SIGNUP
export const signup = async (email: string, password: string) => {
  return safeFetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

// ✅ LOGIN
export const login = async (email: string, password: string) => {
  return safeFetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};