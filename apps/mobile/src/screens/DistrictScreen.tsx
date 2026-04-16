import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { searchPlaces } from "../services/api";

export default function DistrictScreen({ route, navigation }: any) {
  const { state } = route.params;

  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load districts dynamically using API
  useEffect(() => {
    async function load() {
      try {
        // 👉 We use search as fallback to extract districts
        const data = await searchPlaces(`${state} districts India`);

        // 🧠 Extract district names from results
        const names =
          data?.results?.map((item: any) => item.name) || [];

        // ✅ Remove duplicates
        const uniqueDistricts = Array.from(new Set(names));

        setDistricts(uniqueDistricts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [state]);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {state}
      </Text>

      {/* 🔄 Loading */}
      {loading && <ActivityIndicator size="large" color="blue" />}

      {/* ❌ Empty */}
      {!loading && districts.length === 0 && (
        <Text>No districts found</Text>
      )}

      {/* 📋 List */}
      <FlatList
        data={districts}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Places", {
                district: item,
                state,
              })
            }
            style={{
              padding: 14,
              marginVertical: 6,
              backgroundColor: "#e0f2fe",
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}