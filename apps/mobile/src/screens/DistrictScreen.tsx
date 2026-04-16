import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://192.168.29.236:8080";

export default function DistrictScreen({ route, navigation }: any) {
  const { state } = route.params;

  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${BASE_URL}/places/districts?state=${state}`
        );

        setDistricts(res.data || []);
      } catch (err) {
        console.error("District API error:", err);
        setDistricts([]);
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