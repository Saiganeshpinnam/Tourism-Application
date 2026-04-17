import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getPlaceById } from "../services/api";

export default function PlaceDetailsScreen({ route }: any) {
  const { id } = route.params;
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    getPlaceById(id).then(setPlace);
  }, []);

  if (!place) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>{place.name}</Text>
      <Text>{place.description}</Text>
      <Text>{place.location}</Text>
    </View>
  );
}