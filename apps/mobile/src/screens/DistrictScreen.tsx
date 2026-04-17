import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getDistricts } from "../services/api";

export default function DistrictScreen({ route, navigation }: any) {
  const { state } = route.params;
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    getDistricts(state).then(setDistricts);
  }, []);

  return (
    <FlatList
      data={districts}
      keyExtractor={(item: any) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Places", { state, district: item })
          }
        >
          <Text style={{ padding: 15, fontSize: 18 }}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}