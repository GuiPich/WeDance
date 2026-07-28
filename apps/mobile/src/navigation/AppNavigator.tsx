import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../features/auth/screens/LoginScreen";
import { RegisterScreen } from "../features/auth/screens/RegisterScreen";
import { HomeScreen } from "../features/home/screens/HomeScreen";
import { CreateEventScreen } from "../features/events/screens/CreateEventScreen";
import { MapScreen } from "../features/map/screens/MapScreen";

import { RootStackParamList } from "../types/navigation";

import { useAuthStore } from "../store/authStore";
import { EventDetailsScreen } from "../features/events/screens/EventDetailsScreen";
import { EditEventScreen } from "../features/events/screens/EditEventScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const token = useAuthStore((state) => state.token);

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CreateEvent"
            component={CreateEventScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EventDetails"
            component={EventDetailsScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="EditEvent"
            component={EditEventScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: "Inscription",
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
