import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NearbyScreen from "../screens/NearbyScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

const Stack = createNativeStackNavigator();

export default function NearbyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NearbyScreen" component={NearbyScreen} options={{ title: "Nearby" }} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
    </Stack.Navigator>
  );
}