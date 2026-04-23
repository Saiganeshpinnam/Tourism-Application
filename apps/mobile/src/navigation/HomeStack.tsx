import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import DistrictScreen from "../screens/DistrictScreen";
import PlacesScreen from "../screens/PlacesScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack({ navigation }: any) {
  return (
    <Stack.Navigator>

      {/* ✅ HOME SCREEN WITH HEADER */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          headerRight: () => (
            <Ionicons
              name="person-circle-outline"
              size={26}
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Profile")}
            />
          ),
        }}
      />

      {/* ❌ NO HEADER HERE */}
      <Stack.Screen
        name="Districts"
        component={DistrictScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Places"
        component={PlacesScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PlaceDetails"
        component={PlaceDetailsScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}