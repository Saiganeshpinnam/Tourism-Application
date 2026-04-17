import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getStates } from "../services/api";

export default function HomeScreen({ navigation }: any) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  return (
    <FlatList
      data={states}
      keyExtractor={(item: any) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Districts", { state: item })}
        >
          <Text style={{ padding: 15, fontSize: 18 }}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}