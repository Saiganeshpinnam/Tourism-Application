import { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";

export default function HeroVideo() {
  const videoRef = useRef<Video>(null);
  const [isMuted, setIsMuted] = useState(true);

  const screenWidth = Dimensions.get("window").width;

  const videoUrl =
    "https://res.cloudinary.com/dohkwcnvb/video/upload/v1776067813/1776063145630477expMp4_qg3ovn.mp4";

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <View style={[styles.container, { height: screenWidth * 0.55 }]}>

      {/* 🔥 PLATFORM-SPECIFIC VIDEO */}
      <View style={styles.videoWrapper}>
        {Platform.OS === "web" ? (
          // ✅ WEB FIX (CRITICAL)
          <video
            src={videoUrl}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            style={styles.webVideo}
          />
        ) : (
          // ✅ MOBILE (expo-av)
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted={isMuted}
          />
        )}
      </View>

      {/* 🔊 SOUND BUTTON */}
      <TouchableOpacity style={styles.soundBtn} onPress={toggleSound}>
        <Ionicons
          name={isMuted ? "volume-mute" : "volume-high"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {/* 🌑 OVERLAY */}
      <View style={styles.overlay} />

      {/* 📝 TEXT */}
      {/* <View style={styles.textContainer}>
        <Text style={styles.title}>Explore India 🇮🇳</Text>
        <Text style={styles.subtitle}>Discover amazing places</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },

  videoWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // ✅ MOBILE VIDEO
  video: {
    width: "100%",
    height: "100%",
  },

  // ✅ WEB VIDEO (REAL FIX)
  webVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover", // 🔥 IMPORTANT
  },

  soundBtn: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 8,
    borderRadius: 20,
    zIndex: 2,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  textContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    zIndex: 2,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  subtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
});