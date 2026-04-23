import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ AUTO LOGIN (PERSISTENCE)
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Error loading token:", e);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  // ✅ LOGIN
  const login = async (jwtToken: string) => {
    await AsyncStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setIsLoggedIn(true);
  };

  // ✅ LOGOUT
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};