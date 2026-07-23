import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../features/auth/screens/LoginScreen";
import { RegisterScreen } from "../features/auth/screens/RegisterScreen";
import { HomeScreen } from "../features/home/screens/HomeScreen";
import { RootStackParamList } from "../types/navigation";
import { useAuthStore } from "../store/authStore";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const token = useAuthStore((state) => state.token);

  return (
    <Stack.Navigator>
      {token ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
