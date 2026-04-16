import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";

export default function NearbyScreen({ route }: any) {
  const { lat, lng } = route.params;
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `http://localhost:8080/google/nearby?lat=${lat}&lng=${lng}`
      );
      const data = await res.json();
      setPlaces(data.results || []);
    }
    load();
  }, []);

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
}