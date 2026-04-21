import { TouchableOpacity, Text, View, Image } from "react-native";

export default function PlaceCard({ place, onPress }: any) {
  const imageUrl =
    place.photos?.[0]?.photo_reference
      ? `http://192.168.29.236:8080/google/photo?ref=${place.photos[0].photo_reference}`
      : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View
        style={{
          marginVertical: 10,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#fff",
          elevation: 4,
        }}
      >
        {/* 🖼 IMAGE */}
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: 200,
          }}
        />

        {/* ⭐ RATING BADGE */}
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.7)",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12 }}>
            ⭐ {place.rating || "N/A"}
          </Text>
        </View>

        {/* 📄 CONTENT */}
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {place.name}
          </Text>

          <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
            {place.vicinity || place.formatted_address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}