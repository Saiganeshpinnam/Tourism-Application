import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { getPlaceDetails, getPhotoUrl } from "../services/api";
import { Linking, TouchableOpacity } from "react-native";

export default function PlaceDetailsScreen({ route }: any) {
  const { placeId } = route.params;
  const [place, setPlace] = useState<any>(null);

  useEffect(() => {
    getPlaceDetails(placeId).then((data) => {
      setPlace(data.result);
    });
  }, [placeId]);

  if (!place) return <Text>Loading...</Text>;

  const photoRef = place.photos?.[0]?.photo_reference;

  const imageUrl = photoRef
    ? getPhotoUrl(photoRef)
    : "https://picsum.photos/400";

    function openGoogleMaps(lat: number, lng: number, name: string) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;

  Linking.openURL(url).catch(() =>
    console.error("Failed to open Google Maps")
  );
}

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* IMAGE */}
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: 250 }}
      />

      <View style={{ padding: 15 }}>
        
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          {place.name}
        </Text>

        <Text style={{ marginTop: 10 }}>
          {place.formatted_address}
        </Text>

        <Text style={{ marginTop: 10 }}>
          ⭐ Rating: {place.rating || "N/A"}
        </Text>

        <Text style={{ marginTop: 10 }}>
          {place.types?.join(", ")}
        </Text>
      </View>
      <TouchableOpacity
  onPress={() =>
    openGoogleMaps(
      place.geometry?.location?.lat,
      place.geometry?.location?.lng,
      place.name
    )
  }
  style={{
    marginTop: 15,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
  }}
>
  <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
    Navigate 📍
  </Text>
</TouchableOpacity>
    </ScrollView>
  );
}