import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { searchGooglePlaces, getPhotoUrl } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";

export default function PlacesScreen({ route, navigation }: any) {
  const { state, district } = route.params;

  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [state, district]);

  const filtered = places.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{district}</Text>
        <Text style={styles.subtitle}>
          Explore top tourist places in {state}
        </Text>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={COLORS.subText} />
        <TextInput
          placeholder="Search places..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* LOADING */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 20 }}
        />
      )}

      {/* GRID */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.place_id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const photoRef = item.photos?.[0]?.photo_reference;

          const imageUrl = photoRef
            ? getPhotoUrl(photoRef)
            : "https://picsum.photos/300";

          return (
            <TouchableOpacity
              style={styles.cardWrapper}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("PlaceDetails", {
                  placeId: item.place_id,
                })
              }
            >
              <View style={styles.card}>
                
                {/* IMAGE */}
                <Image source={{ uri: imageUrl }} style={styles.image} />

                {/* CONTENT */}
                <View style={styles.content}>
                  
                  <Text numberOfLines={1} style={styles.name}>
                    {item.name}
                  </Text>

                  <Text numberOfLines={1} style={styles.location}>
                    {item.vicinity}
                  </Text>

                  {/* RATING */}
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
        ListEmptyComponent={
          !loading && (
            <Text style={styles.empty}>No places found</Text>
          )
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

  header: {
    marginBottom: SPACING.md,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    color: COLORS.subText,
    marginTop: 4,
    fontSize: 14,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    elevation: 2,
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
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 130,
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

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.subText,
  },
});