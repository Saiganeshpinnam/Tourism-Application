import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

import { getNearbyPlaces, getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";
import { useFavorites } from "../context/FavoritesContext";

export default function NearbyScreen({ navigation }: any) {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function loadNearby() {
      try {
        // ✅ Ask permission
        let { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          alert("Location permission denied");
          return;
        }

        // ✅ Get current location
        let location = await Location.getCurrentPositionAsync({});

        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        // ✅ Call backend API
        const data = await getNearbyPlaces(lat, lng);

        setPlaces(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadNearby();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Finding nearby places...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Nearby Places</Text>

      <FlatList
        data={places}
        keyExtractor={(item) => item.place_id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => {
          const photoRef = item.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? getPhotoUrl(photoRef)
            : "https://picsum.photos/300";

          const fav = isFavorite(item.place_id);

          return (
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() =>
                navigation.navigate("Explore", {
                  screen: "PlaceDetails",
                  params: { placeId: item.place_id },
                })
              }
            >
              <View style={styles.card}>
                {/* IMAGE */}
                <Image source={{ uri: imageUrl }} style={styles.image} />

                {/* ❤️ FAVORITE */}
                <TouchableOpacity
                  style={styles.heart}
                  onPress={() => toggleFavorite(item)}
                >
                  <Ionicons
                    name={fav ? "heart" : "heart-outline"}
                    size={18}
                    color="red"
                  />
                </TouchableOpacity>

                {/* CONTENT */}
                <View style={styles.content}>
                  <Text numberOfLines={1} style={styles.name}>
                    {item.name}
                  </Text>

                  <Text numberOfLines={1} style={styles.location}>
                    {item.vicinity}
                  </Text>

                  <View style={styles.row}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={styles.rating}>
                      {item.rating || "N/A"}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>No nearby places found</Text>
        }
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
    fontSize: 24,
    fontWeight: "800",
    marginBottom: SPACING.md,
  },

  cardWrapper: {
    width: "48%",
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 120,
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
    fontSize: 14,
    fontWeight: "700",
  },

  location: {
    fontSize: 12,
    color: COLORS.subText,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  rating: {
    marginLeft: 4,
    fontSize: 12,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.subText,
  },
});