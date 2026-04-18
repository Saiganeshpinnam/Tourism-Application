import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getPlaceDetails, getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";
import { useFavorites } from "../context/FavoritesContext";

export default function PlaceDetailsScreen({ route, navigation }: any) {
  const { placeId } = route.params;
  const [place, setPlace] = useState<any>(null);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getPlaceDetails(placeId).then((data) => {
      setPlace(data.result);
    });
  }, [placeId]);

  if (!place) {
    return (
      <View style={styles.center}>
        <Text>Loading place...</Text>
      </View>
    );
  }

  const fav = isFavorite(place.place_id);

  const photoRef = place.photos?.[0]?.photo_reference;

  const imageUrl = photoRef
    ? getPhotoUrl(photoRef)
    : "https://picsum.photos/500";

  function openGoogleMaps(lat: number, lng: number) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={styles.hero}>
          <Image source={{ uri: imageUrl }} style={styles.image} />

          <View style={styles.overlay} />

          {/* TOP BAR */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>

            {/* ❤️ FAVORITE */}
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => toggleFavorite(place)}
            >
              <Ionicons
                name={fav ? "heart" : "heart-outline"}
                size={20}
                color="red"
              />
            </TouchableOpacity>
          </View>

          {/* TITLE */}
          <View style={styles.heroText}>
            <Text style={styles.title}>{place.name}</Text>

            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#fff" />
              <Text style={styles.ratingText}>
                {place.rating || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardText}>
              {place.formatted_address}
            </Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="pricetag-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardText}>
              {place.types?.join(", ")}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>About</Text>

          <Text style={styles.description}>
            {place?.editorial_summary?.overview ||
              `${place.name} is a popular tourist destination.`}
          </Text>
        </View>
      </ScrollView>

      {/* NAVIGATE BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.navigateBtn}
          onPress={() =>
            openGoogleMaps(
              place.geometry?.location?.lat,
              place.geometry?.location?.lng
            )
          }
        >
          <Ionicons name="navigate" size={18} color="#fff" />
          <Text style={styles.navigateText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 300 },
  image: { width: "100%", height: "100%", position: "absolute" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  topBar: {
    position: "absolute",
    top: 40,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  heroText: {
    position: "absolute",
    bottom: 20,
    left: 15,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: { color: "#fff", marginLeft: 4 },
  content: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 2,
  },
  cardText: {
    marginLeft: 10,
    flex: 1,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: SPACING.md,
  },
  description: {
    marginTop: 5,
    color: COLORS.subText,
    lineHeight: 20,
  },
  bottomBar: {
    padding: SPACING.md,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navigateBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navigateText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});