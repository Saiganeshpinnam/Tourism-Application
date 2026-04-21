import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import NearbyStack from "./NearbyStack";
import FavoritesStack from "./FavoritesStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563eb",
        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Nearby") iconName = "location";
          else if (route.name === "Favorites") iconName = "heart";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Nearby" component={NearbyStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
    </Tab.Navigator>
  );
}