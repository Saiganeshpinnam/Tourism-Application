import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function ImageCarousel({ images }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePinch = (event: any) => {
    scale.value = event.nativeEvent.scale;
  };

  const handleEnd = () => {
    scale.value = withTiming(1);
  };

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
          <PinchGestureHandler
            onGestureEvent={handlePinch}
            onEnded={handleEnd}
          >
            <Animated.View style={[styles.imageWrapper, animatedStyle]}>
              <Image source={{ uri: item }} style={styles.image} />
            </Animated.View>
          </PinchGestureHandler>
        )}
      />

      {/* 🔵 DOT INDICATOR */}
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
    height: 300,
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