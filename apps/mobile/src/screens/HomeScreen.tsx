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
import { getStates } from "../services/api";

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
    >
      {/* Optional image placeholder */}
      <Image
        source={{
          uri: "https://via.placeholder.com/150",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading states...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🌍 Explore India</Text>

      <FlatList
        data={states}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#f2f2f2",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 100,
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});