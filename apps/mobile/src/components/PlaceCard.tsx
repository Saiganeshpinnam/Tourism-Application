import { TouchableOpacity, Text, Image, View } from "react-native";

export default function PlaceCard({ place, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ margin: 10 }}>
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
          }}
          style={{ height: 150, borderRadius: 10 }}
        />
        <Text>{place.name}</Text>
        <Text>⭐ {place.rating || "N/A"}</Text>
      </View>
    </TouchableOpacity>
  );
}