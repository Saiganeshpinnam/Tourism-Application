import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from "react-native";
import { searchGooglePlaces, getPhotoUrl } from "../services/api";

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
    <View style={{ flex: 1, padding: 12, backgroundColor: "#f5f5f5" }}>
      
      {/* HEADER */}
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        {district}, {state}
      </Text>

      {/* SEARCH */}
      <TextInput
        placeholder="Search places..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
          backgroundColor: "#fff",
        }}
      />

      {loading && <Text>Loading...</Text>}

      <FlatList
  data={filtered}
  keyExtractor={(item) => item.place_id}
  numColumns={2} // 🔥 GRID
  columnWrapperStyle={{
    justifyContent: "space-between",
  }}
  renderItem={({ item }) => {
    const photoRef = item.photos?.[0]?.photo_reference;

    const imageUrl = photoRef
      ? getPhotoUrl(photoRef)
      : "https://picsum.photos/300";

    return (
      <TouchableOpacity
        style={{ width: "48%" }} // 🔥 IMPORTANT
        onPress={() =>
          navigation.navigate("PlaceDetails", {
            placeId: item.place_id,
          })
        }
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            marginBottom: 12,
            overflow: "hidden",
            elevation: 4,
          }}
        >
          {/* IMAGE */}
          <Image
            source={{ uri: imageUrl }}
            style={{ width: "100%", height: 120 }}
          />

          {/* CONTENT */}
          <View style={{ padding: 8 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>

            <Text
              numberOfLines={1}
              style={{ color: "#666", fontSize: 12 }}
            >
              {item.vicinity}
            </Text>

            <Text style={{ fontSize: 12, marginTop: 2 }}>
              ⭐ {item.rating || "N/A"}
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