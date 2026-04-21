import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  TextInput,
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    getStates()
      .then(setStates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredStates = states.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("Districts" as never, { state: item } as never)
      }
    >
      {/* IMAGE */}
      <Image
  source={{
    uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  }}
  style={styles.image}
/>

      {/* GRADIENT OVERLAY */}
      <View style={styles.overlay} />

      {/* CONTENT */}
      <View style={styles.content}>
        <Ionicons name="location" size={16} color="#fff" />
        <Text style={styles.text}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  // 🔄 LOADING
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
      data={filteredStates}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ padding: SPACING.md }}

      ListHeaderComponent={
        <>
          {/* 🎥 HERO */}
          <View style={styles.heroWrapper}>
            <HeroVideo />

            {/* HERO TEXT OVERLAY */}
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Explore India 🇮🇳</Text>
              <Text style={styles.heroSubtitle}>
                Find your next destination
              </Text>
            </View>
          </View>

          {/* 🔍 SEARCH */}
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={COLORS.subText} />
            <TextInput
              placeholder="Search states..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
            />
          </View>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>Popular States</Text>
          </View>
        </>
      }
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heroWrapper: {
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },

  heroOverlay: {
    position: "absolute",
    bottom: 20,
    left: 16,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },

  heroSubtitle: {
    color: "#eee",
    marginTop: 4,
  },

  header: {
    marginBottom: SPACING.md,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 45,
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