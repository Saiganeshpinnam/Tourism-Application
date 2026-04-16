import { TouchableOpacity, Text, View } from "react-native";

export default function PlaceCard({ place, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 12,
          marginVertical: 6,
          backgroundColor: "#fff",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{place.name}</Text>
        <Text>⭐ {place.rating || "N/A"}</Text>
      </View>
    </TouchableOpacity>
  );
}