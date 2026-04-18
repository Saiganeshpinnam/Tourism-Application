import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useFavorites } from "../context/FavoritesContext";
import { getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";

export default function FavoritesScreen({ navigation }: any) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  if (!favorites.length) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16 }}>No favorites yet ❤️</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item: any) => item.place_id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }: any) => {
          const photoRef = item.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? getPhotoUrl(photoRef)
            : "https://picsum.photos/300";

          const fav = isFavorite(item.place_id);

          return (
            <TouchableOpacity
              style={styles.cardWrapper}
              activeOpacity={0.85}
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

                {/* ❤️ REMOVE BUTTON */}
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

                  <View style={styles.ratingRow}>
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

  cardWrapper: {
    width: "48%",
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: "hidden",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 130,
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
    color: COLORS.text,
  },

  location: {
    fontSize: 12,
    color: COLORS.subText,
    marginTop: 2,
  },

  ratingRow: {
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
});