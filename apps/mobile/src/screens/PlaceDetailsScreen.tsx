import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";

export default function PlaceDetailsScreen({ route, navigation }: any) {
  const { placeId } = route.params;
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `http://localhost:8080/google/details?placeId=${placeId}`
      );
      const data = await res.json();
      setPlace(data.result);
    }
    load();
  }, []);

  if (!place) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22 }}>{place.name}</Text>
      <Text>{place.formatted_address}</Text>

      <Button
        title="Nearby Places"
        onPress={() =>
          navigation.navigate("Nearby", {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          })
        }
      />

      <Button
        title="Favorites"
        onPress={() => navigation.navigate("Favorites")}
      />
    </View>
  );
}