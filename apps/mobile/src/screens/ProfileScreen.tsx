import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode"; // ✅ FIXED

const ProfileScreen = () => {
  const { logout, token } = useContext(AuthContext);

  let email = "Unknown";

  try {
    if (token) {
      const decoded: any = jwtDecode(token);

      console.log("DECODED JWT:", decoded); // 🔍 debug

      email = decoded?.sub || decoded?.email || "Unknown";
    }
  } catch (e) {
    console.error("JWT decode error", e);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile 👤</Text>

      <Text style={styles.label}>Email</Text>
      <Text style={styles.value}>{email}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 30,
  },
  logoutBtn: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});