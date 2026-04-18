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
                navigation.navigate("PlaceDetails", {
                  placeId: item.place_id,
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
    fontSize: 24,
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
    fontWeight: "700",
  },

  location: {
    fontSize: 12,
    color: COLORS.subText,
  },
});