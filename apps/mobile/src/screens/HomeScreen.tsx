import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { getStates } from "../services/api";
import HeroVideo from "../components/HeroVideo";
import { COLORS, SPACING, RADIUS } from "../styles/theme";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStates()
      .then(setStates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Districts" as never, { state: item } as never)
      }
      activeOpacity={0.85}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        }}
        style={styles.image}
      />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <Ionicons name="location" size={18} color="#fff" />
        <Text style={styles.text}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10 }}>Loading states...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={states}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: SPACING.md }}

      // 🎥 HERO + HEADER
      ListHeaderComponent={
        <>
          <HeroVideo />

          <View style={styles.header}>
            <Text style={styles.title}>Explore India</Text>
            <Text style={styles.subtitle}>
              Discover states & tourist destinations
            </Text>
          </View>
        </>
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
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
    width: "48%",
    height: 140,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.md,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});