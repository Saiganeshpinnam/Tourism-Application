import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function ShimmerCard() {
  return (
    <View style={styles.card}>
      <ShimmerPlaceHolder
        LinearGradient={LinearGradient}
        style={styles.image}
      />

      <View style={{ padding: 10 }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={styles.line}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={[styles.line, { width: "60%", marginTop: 6 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 130,
  },
  line: {
    height: 10,
    width: "80%",
    borderRadius: 5,
  },
});