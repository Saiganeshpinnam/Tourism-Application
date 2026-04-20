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
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getPlaceDetails, getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";
import { useFavorites } from "../context/FavoritesContext";

// 🏨 DUMMY HOTELS
const dummyHotels = [
  {
    id: "1",
    name: "Grand Palace Hotel",
    image: "https://picsum.photos/300?1",
    rating: 4.5,
    price: "₹2500/night",
    phone: "919876543210",
  },
  {
    id: "2",
    name: "City View Residency",
    image: "https://picsum.photos/300?2",
    rating: 4.2,
    price: "₹1800/night",
    phone: "919876543211",
  },
  {
    id: "3",
    name: "Royal Stay Inn",
    image: "https://picsum.photos/300?3",
    rating: 4.6,
    price: "₹3200/night",
    phone: "919876543212",
  },
  {
    id: "4",
    name: "Budget Comfort Hotel",
    image: "https://picsum.photos/300?4",
    rating: 4.0,
    price: "₹1200/night",
    phone: "919876543213",
  },
];

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

  const lat = place.geometry?.location?.lat;
  const lng = place.geometry?.location?.lng;

  // 🚀 BEST NAVIGATION METHOD
  function openGoogleMaps() {
    if (!lat || !lng) {
      Alert.alert("Error", "Location not available");
      return;
    }

    // 🔥 REAL GPS NAVIGATION
    const url = `google.navigation:q=${lat},${lng}`;

    Linking.openURL(url).catch(() => {
      // fallback (browser)
      const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      Linking.openURL(webUrl);
    });
  }

  function callHotel(phone: string) {
    Linking.openURL(`tel:${phone}`);
  }

  function openWhatsApp(phone: string, name: string) {
    const msg = `Hi, I found ${name} on Tourism App. I want to book a room.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
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

          <View style={styles.heroText}>
            <Text style={styles.title}>{place.name}</Text>
            <Text style={styles.rating}>
              ⭐ {place.rating || "N/A"}
            </Text>
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {place?.editorial_summary?.overview ||
              `${place.name} is a popular tourist destination.`}
          </Text>

          {/* 🏨 HOTELS */}
          <Text style={styles.sectionTitle}>🏨 Nearby Hotels</Text>

          <FlatList
            data={dummyHotels}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.hotelCard}>
                <Image source={{ uri: item.image }} style={styles.hotelImage} />
                <View style={styles.hotelContent}>
                  <Text style={styles.hotelName}>{item.name}</Text>
                  <Text>⭐ {item.rating}</Text>
                  <Text style={styles.hotelPrice}>{item.price}</Text>

                  <View style={styles.btnRow}>
                    <TouchableOpacity
                      style={styles.whatsappBtn}
                      onPress={() => openWhatsApp(item.phone, item.name)}
                    >
                      <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.callBtn}
                      onPress={() => callHotel(item.phone)}
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

      {/* NAVIGATE BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navigateBtn} onPress={openGoogleMaps}>
          <Ionicons name="navigate" size={18} color="#fff" />
          <Text style={styles.navigateText}>Start Navigation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { height: 300 },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

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
    backgroundColor: COLORS.background,
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

  hotelImage: {
    width: "100%",
    height: 120,
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