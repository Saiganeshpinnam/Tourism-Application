import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { searchPlaces } from "../services/api";
import PlaceCard from "../components/PlaceCard";

export default function PlacesScreen({ route, navigation }: any) {
  const { district, state } = route.params;
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await searchPlaces(
        `${district} ${state} tourist attractions`
      );
      setPlaces(data.results || []);
    }
    load();
  }, []);

  return (
    <View>
      <FlatList
        data={places}
        renderItem={({ item }: any) => (
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