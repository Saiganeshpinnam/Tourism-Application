import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ShimmerCard from "../components/ShimmerCard";
import { searchGooglePlaces, getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";
import { useFavorites } from "../context/FavoritesContext";

export default function PlacesScreen({ route, navigation }: any) {
  const { state, district } = route.params;

  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function load() {
      try {
        let data = await searchGooglePlaces(
          `${district} ${state} tourist attractions India`
        );

        if (!data?.results?.length) {
          data = await searchGooglePlaces(
            `${state} famous tourist places`
          );
        }

        setPlaces(data?.results || []);
      } catch (err) {
        console.error("Places error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [state, district]);

  const filtered = places.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔄 LOADING UI
  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={() => <ShimmerCard />}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>{district}</Text>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={COLORS.subText} />
        <TextInput
          placeholder="Search places..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* GRID */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.place_id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => {
          const photoRef = item.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? getPhotoUrl(photoRef)
            : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

          const fav = isFavorite(item.place_id);

          return (
            <TouchableOpacity
              style={styles.cardWrapper}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("PlaceDetails", {
                  placeId: item.place_id,
                })
              }
            >
              <View style={styles.card}>
                {/* IMAGE */}
                <Image source={{ uri: imageUrl }} style={styles.image} />

                {/* ⭐ RATING */}
                <View style={styles.rating}>
                  <Text style={styles.ratingText}>
                    ⭐ {item.rating || "N/A"}
                  </Text>
                </View>

                {/* ❤️ FAVORITE */}
                <TouchableOpacity
                  style={styles.heart}
                  onPress={() => toggleFavorite(item)}
                >
                  <Ionicons
                    name={fav ? "heart" : "heart-outline"}
                    size={18}
                    color={fav ? "red" : "#333"}
                  />
                </TouchableOpacity>

                {/* CONTENT */}
                <View style={styles.content}>
                  <Text numberOfLines={1} style={styles.name}>
                    {item.name}
                  </Text>

                  <Text numberOfLines={1} style={styles.location}>
                    {item.vicinity || item.formatted_address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: SPACING.md,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 45,
  },

  cardWrapper: {
    width: "48%",
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: "hidden",
    elevation: 4, // 🔥 shadow Android
  },

  image: {
    width: "100%",
    height: 140,
  },

  rating: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },

  ratingText: {
    color: "#fff",
    fontSize: 11,
  },

  heart: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
  },

  content: {
    padding: SPACING.sm,
  },

  name: {
    fontWeight: "700",
    fontSize: 14,
  },

  location: {
    fontSize: 11,
    color: COLORS.subText,
    marginTop: 2,
  },
});