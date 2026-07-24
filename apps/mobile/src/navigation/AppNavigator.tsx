import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../features/auth/screens/LoginScreen";
import { RegisterScreen } from "../features/auth/screens/RegisterScreen";
import { HomeScreen } from "../features/home/screens/HomeScreen";
import { CreateEventScreen } from "../features/events/screens/CreateEventScreen";

import { RootStackParamList } from "../types/navigation";

import { useAuthStore } from "../store/authStore";
import { EventDetailsScreen } from "../features/events/screens/EventDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const token = useAuthStore((state) => state.token);

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />

          <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
