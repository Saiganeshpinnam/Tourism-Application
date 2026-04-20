import { useEffect, useState, useRef } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useFavorites } from "../context/FavoritesContext";
import { getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";

export default function FavoritesScreen({ navigation }: any) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [loading, setLoading] = useState(true);

  // 🔥 simulate loading (since favorites are local)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800); // smooth shimmer feel
  }, []);

  // =========================
  // 🔥 SHIMMER CARD
  // =========================
  const ShimmerCard = () => {
    const shimmer = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.loop(
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }, []);

    const translateX = shimmer.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 150],
    });

    return (
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.image}>
            <Animated.View
              style={[
                styles.shimmerOverlay,
                { transform: [{ translateX }] },
              ]}
            />
          </View>

          <View style={styles.content}>
            <View style={styles.shimmerLine} />
            <View style={styles.shimmerLineSmall} />
          </View>
        </View>
      </View>
    );
  };

  // =========================
  // ✅ REAL CARD
  // =========================
  const renderItem = ({ item }: any) => {
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Favorites</Text>

      <FlatList
        data={loading ? Array(6).fill({}) : favorites}
        keyExtractor={(_, i) => i.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={loading ? () => <ShimmerCard /> : renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>
              No favorites yet
            </Text>
          ) : null
        }
      />
    </View>
  );
}

// =========================
// 🎨 STYLES
// =========================
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
    backgroundColor: "#ddd",
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

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.subText,
  },

  // 🔥 SHIMMER
  shimmerOverlay: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  shimmerLine: {
    height: 12,
    backgroundColor: "#e0e0e0",
    marginBottom: 6,
    borderRadius: 4,
  },

  shimmerLineSmall: {
    height: 10,
    width: "60%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
});