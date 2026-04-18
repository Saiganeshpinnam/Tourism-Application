import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getPlacesByState } from "../services/api";
import { COLORS, SPACING, RADIUS } from "../styles/theme";

export default function DistrictScreen({ route, navigation }: any) {
  const { state } = route.params;
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    getPlacesByState(state).then((data) => {
      const unique = [...new Set(data.map((p: any) => p.name))];
      setDistricts(unique.slice(0, 10));
    });
  }, [state]);

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>{state}</Text>
        <Text style={styles.subtitle}>
          Select a district to explore
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={districts}
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
});