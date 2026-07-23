import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import { AppInput } from "../../../components/AppInput";

import { AppButton } from "../../../components/AppButton";
import { Alert } from "react-native";

import { api } from "../../../services/api";

import { useAuthStore } from "../../../store/authStore";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const { login } = useAuthStore();

  const handleLogin = async () => {
    console.log("BOUTON CLIQUE");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("REPONSE API", response.data);

      login(response.data.accessToken);

      console.log("TOKEN STOCKE", useAuthStore.getState().token);

      Alert.alert("Succès", "Connexion réussie");
    } catch (error) {
      console.log("ERREUR LOGIN", error);

      Alert.alert("Erreur", "Identifiants incorrects");
    }

    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeDance</Text>

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
    color: "#7C3AED",
  },
});
