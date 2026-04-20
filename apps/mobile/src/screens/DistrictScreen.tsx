import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS, SPACING, RADIUS } from "../styles/theme";
import { stateDistricts } from "../data/stateDistricts";

export default function DistrictScreen({ route, navigation }: any) {
  const { state } = route.params;

  const [districts, setDistricts] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // ✅ LOAD DISTRICTS FROM STATIC DATA
  useEffect(() => {
    const data = stateDistricts[state] || [];
    setDistricts(data);
  }, [state]);

  // 🔍 FILTER
  const filtered = districts.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{state}</Text>
        <Text style={styles.subtitle}>
          Select a district to explore
        </Text>
      </View>

      {/* 🔍 SEARCH */}
      <TextInput
        placeholder="Search district..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* LIST */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Places", { state, district: item })
            }
          >
            <View style={styles.card}>
              
              {/* LEFT ICON */}
              <Ionicons
                name="location-outline"
                size={22}
                color={COLORS.primary}
              />

              {/* TEXT */}
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.name}>{item}</Text>
                <Text style={styles.desc}>
                  Explore tourist places
                </Text>
              </View>

              {/* RIGHT ARROW */}
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.subText}
                style={{ marginLeft: "auto" }}
              />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No districts found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },

  header: {
    marginBottom: SPACING.lg,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    color: COLORS.subText,
    marginTop: 4,
    fontSize: 14,
  },

  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: "#eee",
  },

  card: {
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderRadius: RADIUS.lg,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  desc: {
    fontSize: 12,
    color: COLORS.subText,
    marginTop: 2,
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.subText,
  },
});