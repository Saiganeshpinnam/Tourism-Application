import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DistrictScreen from "../screens/DistrictScreen";
import PlacesScreen from "../screens/PlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="Districts" component={DistrictScreen} />
      <Stack.Screen name="Places" component={PlacesScreen} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
    </Stack.Navigator>
  );
}