import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { getStates } from "../services/api";

export default function HomeScreen({ navigation }: any) {
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getStates();
      setStates(data || []);
    }
    load();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Explore India 🇮🇳
      </Text>

      <FlatList
        data={states}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("District", { state: item })
            }
            style={{
              padding: 12,
              marginVertical: 6,
              backgroundColor: "#dbeafe",
              borderRadius: 10,
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}