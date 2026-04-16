import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DistrictScreen from "../screens/DistrictScreen";
import PlacesScreen from "../screens/PlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import NearbyScreen from "../screens/NearbyScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="District" component={DistrictScreen} />

        <Stack.Screen name="Places" component={PlacesScreen} />

        <Stack.Screen name="Details" component={PlaceDetailsScreen} />

        <Stack.Screen name="Nearby" component={NearbyScreen} />

        <Stack.Screen name="Favorites" component={FavoritesScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}