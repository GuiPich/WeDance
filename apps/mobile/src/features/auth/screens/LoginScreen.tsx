import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import { AppInput } from "../../../components/AppInput";

import { AppButton } from "../../../components/AppButton";
import { Alert } from "react-native";

import { api } from "../../../services/api";

import { useAuthStore } from "../../../store/authStore";
import { COLORS } from "../../../constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuthStore();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      login(response.data.accessToken);

      Alert.alert("Succès", "Connexion réussie");
    } catch (error) {
      console.log("ERREUR LOGIN", error);

      Alert.alert("Erreur", "Identifiants incorrects");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logoText.png")}
        style={{
          width: 220,
          height: 90,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 40,
        }}
      />

      <AppInput placeholder="Email" value={email} onChangeText={setEmail} />
      <AppInput
        placeholder="Mot de passe"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <AppButton title="Se connecter" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Créer un compte
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },

  link: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.primary,
  },
});
