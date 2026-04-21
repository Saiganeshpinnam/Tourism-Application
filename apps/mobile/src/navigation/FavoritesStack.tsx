import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../screens/FavoritesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: "Favorites" }} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
    </Stack.Navigator>
  );
}