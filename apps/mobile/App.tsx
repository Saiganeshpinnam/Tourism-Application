import React, { useEffect } from "react";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { AuthProvider } from "./src/context/AuthContext"; // ✅ NEW
import * as ScreenCapture from "expo-screen-capture";
import { Platform } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  useEffect(() => {
  if (Platform.OS !== "web") {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }
}, []);

  return (
    <AuthProvider> {/* ✅ Wrap Auth FIRST */}
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </AuthProvider>
  );
}



// allows screenshots

// export default function App() {
//   return (<FavoritesProvider>
//   <AppNavigator />
// </FavoritesProvider>)
// }