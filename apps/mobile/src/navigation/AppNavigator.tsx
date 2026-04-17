import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DistrictScreen from "../screens/DistrictScreen";
import PlacesScreen from "../screens/PlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Districts" component={DistrictScreen} />
        <Stack.Screen name="Places" component={PlacesScreen} />
        <Stack.Screen name="Details" component={PlaceDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}