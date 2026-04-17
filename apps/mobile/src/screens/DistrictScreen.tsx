import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text } from "react-native";
import { getPlacesByState } from "../services/api";

export default function DistrictScreen({ route, navigation }: any) {
  const { state } = route.params;
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    getPlacesByState(state).then((data) => {
      console.log("ALL PLACES:", data);

      // 🔥 Extract unique names (districts)
      const unique = [
        ...new Set(data.map((p: any) => p.name))
      ];

      // 🔥 Limit to 10 like web
      setDistricts(unique.slice(0, 10));
    });
  }, [state]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={districts}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Places", { state, district: item })
            }
          >
            <Text style={{ padding: 15, fontSize: 18 }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}