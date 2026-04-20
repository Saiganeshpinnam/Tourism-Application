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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getPlaceDetails, getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";
import { useFavorites } from "../context/FavoritesContext";

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

  // 📍 NAVIGATION
  function openGoogleMaps(lat: number, lng: number) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    Linking.openURL(url);
  }

  // 📞 CALL
  function callHotel(phone: string) {
    Linking.openURL(`tel:${phone}`);
  }

  // 💬 WHATSAPP
  function openWhatsApp(phone: string, name: string) {
    const message = `Hi, I found ${name} on Tourism App. I want to book a room.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
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
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtn} onPress={() => toggleFavorite(place)}>
              <Ionicons name={fav ? "heart" : "heart-outline"} size={20} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroText}>
            <Text style={styles.title}>{place.name}</Text>
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
                  <Text style={styles.hotelRating}>⭐ {item.rating}</Text>
                  <Text style={styles.hotelPrice}>{item.price}</Text>

                  {/* 🔥 BUTTON ROW */}
                  <View style={styles.btnRow}>
                    
                    {/* WHATSAPP */}
                    <TouchableOpacity
                      style={styles.whatsappBtn}
                      onPress={() => openWhatsApp(item.phone, item.name)}
                    >
                      <Ionicons name="logo-whatsapp" size={16} color="#fff" />
                    </TouchableOpacity>

                    {/* CALL */}
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

      {/* NAVIGATE */}
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
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },

  topBar: {
    position: "absolute",
    top: 40,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconBtn: { backgroundColor: "#fff", padding: 8, borderRadius: 20 },

  heroText: { position: "absolute", bottom: 20, left: 15 },

  title: { color: "#fff", fontSize: 26, fontWeight: "800" },

  content: { padding: SPACING.lg },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginTop: SPACING.md },

  description: { marginTop: 5 },

  hotelCard: {
    width: 200,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },

  hotelImage: { width: "100%", height: 120 },

  hotelContent: { padding: 10 },

  hotelName: { fontWeight: "bold" },

  hotelRating: { fontSize: 12 },

  hotelPrice: { color: "#007AFF", fontWeight: "600" },

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

  bottomBar: { padding: 10 },

  navigateBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  navigateText: { color: "#fff", marginLeft: 8 },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});