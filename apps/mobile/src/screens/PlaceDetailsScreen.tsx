import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getPlaceDetails, getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";
import { useFavorites } from "../context/FavoritesContext";
import ImageCarousel from "../components/ImageCarousel";
import * as Location from "expo-location";

// 🏨 DUMMY HOTELS
const dummyHotels = [
  { id: "1", name: "Grand Palace Hotel", image: "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776665716/177666553255048815_z7calr.jpg", rating: 4.5, price: "₹2500/night", phone: "919876543210" },
  { id: "2", name: "City View Residency", image: "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776665905/17766658360112816d_spc880.jpg", rating: 4.2, price: "₹1800/night", phone: "919876543211" },
  { id: "3", name: "Royal Stay Inn", image: "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776666073/17766660201311293c_cujae9.jpg", rating: 4.6, price: "₹3200/night", phone: "919876543212" },
  { id: "4", name: "Budget Comfort Hotel", image: "https://res.cloudinary.com/do3uk8wnj/image/upload/v1776666187/1776666166610318db_csdcat.jpg", rating: 4.0, price: "₹1200/night", phone: "919876543213" },
];

export default function PlaceDetailsScreen({ route, navigation }: any) {
  const { placeId } = route.params;

  const [place, setPlace] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    getPlaceDetails(placeId).then((data) => {
      setPlace(data?.result);
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

  const images =
    place.photos?.slice(0, 6).map((p: any) =>
      getPhotoUrl(p.photo_reference)
    ) || ["https://picsum.photos/600"];

  const lat = place.geometry?.location?.lat;
  const lng = place.geometry?.location?.lng;

  // 🚀 NAVIGATION FIXED
  async function openGoogleMaps() {
    if (loadingLocation) return;

    try {
      setLoadingLocation(true);

      if (!lat || !lng) {
        Alert.alert("Error", "Destination not available");
        return;
      }

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission denied", "Location required");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // ⚡ faster
      });

      const currentLat = location.coords.latitude;
      const currentLng = location.coords.longitude;

      const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${lat},${lng}&travelmode=driving`;

      await Linking.openURL(url);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location");
    } finally {
      setLoadingLocation(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 HERO */}
        <View style={styles.hero}>
          <ImageCarousel images={images} />

          <View style={styles.overlay} />

          {/* TOP BAR */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>

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

          {/* TEXT */}
          <View style={styles.heroText}>
            <Text style={styles.title}>{place.name}</Text>
            <Text style={styles.rating}>⭐ {place.rating || "N/A"}</Text>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {place?.editorial_summary?.overview ||
              `${place.name} is a popular tourist destination.`}
          </Text>

          {/* HOTELS */}
          <Text style={styles.sectionTitle}>Nearby Hotels</Text>

          <FlatList
            horizontal
            data={dummyHotels}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.hotelCard}>
                <ImageCarousel images={[item.image]} />

                <View style={styles.hotelContent}>
                  <Text style={styles.hotelName}>{item.name}</Text>
                  <Text>⭐ {item.rating}</Text>
                  <Text style={styles.hotelPrice}>{item.price}</Text>

                  <View style={styles.btnRow}>
                    <TouchableOpacity
                      style={styles.whatsappBtn}
                      onPress={() =>
                        Linking.openURL(`https://wa.me/${item.phone}`)
                      }
                    >
                      <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.callBtn}
                      onPress={() =>
                        Linking.openURL(`tel:${item.phone}`)
                      }
                    >
                      <Ionicons name="call" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>

      {/* 🚀 BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.navigateBtn,
            loadingLocation && { opacity: 0.6 },
          ]}
          onPress={openGoogleMaps}
          disabled={loadingLocation}
        >
          <Ionicons name="navigate" size={18} color="#fff" />
          <Text style={styles.navigateText}>
            {loadingLocation
              ? "Fetching location..."
              : "Start Navigation"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 300 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
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

  rating: {
    color: "#fff",
    marginTop: 4,
  },

  content: {
    padding: SPACING.lg,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: SPACING.md,
  },

  description: {
    marginTop: 5,
    color: COLORS.subText,
  },

  hotelCard: {
    width: 200,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
  },

  hotelContent: {
    padding: 10,
  },

  hotelName: {
    fontWeight: "bold",
  },

  hotelPrice: {
    color: "#007AFF",
    fontWeight: "600",
    marginTop: 4,
  },

  btnRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  whatsappBtn: {
    backgroundColor: "#25D366",
    padding: 8,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },

  callBtn: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 6,
    width: "48%",
    alignItems: "center",
  },

  bottomBar: {
    padding: SPACING.md,
    backgroundColor: "#fff",
  },

  navigateBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    justifyContent: "center",
  },

  navigateText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


