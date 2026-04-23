import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { validateEmail } from "../utils/validators";
import { login } from "../services/authApi";
import { AuthContext } from "../context/AuthContext";

// Google Auth
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login: setLogin } = useContext(AuthContext);

  // Google (mobile only)
  let response: any = null;
  let promptAsync: any = null;

  if (Platform.OS !== "web") {
    const googleAuth = Google.useAuthRequest({
      expoClientId: "YOUR_EXPO_CLIENT_ID",
      androidClientId: "YOUR_ANDROID_CLIENT_ID",
    });

    response = googleAuth[1];
    promptAsync = googleAuth[2];
  }

  useEffect(() => {
    if (response?.type === "success") {
      setLogin("google-token"); // placeholder
    }
  }, [response]);

  // ✅ LOGIN
  const handleLogin = async () => {
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const res = await login(email, password);

    if (res.token) {
      await setLogin(res.token); // ✅ JWT stored
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* ✅ ERROR MESSAGE */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Google Login */}
      {Platform.OS !== "web" && (
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync && promptAsync()}
        >
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#db4437",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  googleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#007bff",
  },
});