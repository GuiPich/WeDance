import { useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native";

import { getMe } from "../../../services/auth";

import { useAuthStore } from "../../../store/authStore";

export function HomeScreen() {
  const token = useAuthStore((state) => state.token);

  const setUser = useAuthStore((state) => state.setUser);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const load = async () => {
      if (!token) return;

      const profile = await getMe(token);

      setUser(profile);
    };

    void load();
  }, [token]);

  const logout = useAuthStore((state) => state.logout);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Bonjour {user?.firstName}</Text>

      <Button
        title="Déconnexion"
        onPress={() => {
          void logout();
        }}
      />
      
    </View>
  );
}
