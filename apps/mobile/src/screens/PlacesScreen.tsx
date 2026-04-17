import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { getPlaces } from "../services/api";

export default function PlacesScreen({ route, navigation }: any) {
  const { state, district } = route.params;
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces(state, district).then(setPlaces);
  }, []);

  return (
    <FlatList
      data={places}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", { id: item.id })}
        >
          <Text style={{ padding: 15 }}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}