import React, { useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ImageCarousel({ images = [] }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover" // 🔥 perfect fit
            />
          </View>
        )}
      />

      {/* DOTS */}
      <View style={styles.dots}>
        {images.map((_: any, i: number) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    width,
    height: width * 0.65, // ✅ responsive height
  },

  image: {
    width: "100%",
    height: "100%",
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
    margin: 4,
  },

  activeDot: {
    backgroundColor: "#2563eb",
  },
});