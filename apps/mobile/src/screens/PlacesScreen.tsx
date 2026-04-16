import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { searchGooglePlaces } from "../services/api";
import PlaceCard from "../components/PlaceCard";

export default function PlacesScreen({ route, navigation }: any) {
  const { district, state } = route.params;
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await searchGooglePlaces(
        `${district} ${state} tourist places`
      );
      setPlaces(data?.results || []);
    }
    load();
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <PlaceCard
            place={item}
            onPress={() =>
              navigation.navigate("Details", {
                placeId: item.place_id,
              })
            }
          />
        )}
      />
    </View>
  );
}