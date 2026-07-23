import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { useAuthBootstrap } from "./src/hooks/useBootstrap";

export default function App() {
  useAuthBootstrap();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
