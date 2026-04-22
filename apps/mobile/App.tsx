import React from "react";

import { FavoritesProvider } from "./src/context/FavoritesContext";
import { useEffect } from "react";
import * as ScreenCapture from "expo-screen-capture";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {

  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  return  (<FavoritesProvider>
   <AppNavigator />
 </FavoritesProvider>)
}



// allows screenshots

// export default function App() {
//   return (<FavoritesProvider>
//   <AppNavigator />
// </FavoritesProvider>)
// }