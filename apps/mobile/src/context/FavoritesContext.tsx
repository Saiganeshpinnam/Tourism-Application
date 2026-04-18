import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext<any>(null);
const KEY = "FAVORITES";

export const FavoritesProvider = ({ children }: any) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  // 🔥 LOAD FROM STORAGE
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await AsyncStorage.getItem(KEY);
    if (data) setFavorites(JSON.parse(data));
  };

  // 🔥 TOGGLE FAVORITE
  const toggleFavorite = async (place: any) => {
    let updated;

    const exists = favorites.find(
      (p) => p.place_id === place.place_id
    );

    if (exists) {
      updated = favorites.filter(
        (p) => p.place_id !== place.place_id
      );
    } else {
      updated = [...favorites, place];
    }

    setFavorites(updated);
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  };

  const isFavorite = (placeId: string) => {
    return favorites.some((p) => p.place_id === placeId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);