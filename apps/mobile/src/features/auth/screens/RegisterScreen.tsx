import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../components/AppButton";

import { register } from "../../../services/auth";

import { COLORS } from "../../../constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!firstName || !lastName || !email || !password) {
        Alert.alert("Erreur", "Tous les champs sont obligatoires");

        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Erreur", "Les mots de passe ne correspondent pas");

        return;
      }

      await register({
        firstName,
        lastName,
        email,
        password,
      });

      Alert.alert("Succès", "Compte créé avec succès");

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);

      Alert.alert("Erreur", "Impossible de créer le compte");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logoText.png")}
        resizeMode="contain"
        style={styles.logo}
      />

      <Text style={styles.title}>Créer un compte</Text>

      <AppInput
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
      />

      <AppInput placeholder="Nom" value={lastName} onChangeText={setLastName} />

      <AppInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <AppInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppInput
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <AppButton title="S'inscrire" onPress={handleRegister} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
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

  logo: {
    width: 240,
    height: 90,
    alignSelf: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: COLORS.text,
    marginBottom: 25,
  },

  link: {
    textAlign: "center",
    marginTop: 20,
    color: COLORS.primary,
    fontWeight: "600",
  },
});
