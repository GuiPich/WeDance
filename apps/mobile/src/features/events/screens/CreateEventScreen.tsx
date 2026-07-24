import { useState } from "react";

import { View, Text, StyleSheet, Alert } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../components/AppButton";

import { createEvent } from "../../../services/event";

import { useAuthStore } from "../../../store/authStore";

type Props = NativeStackScreenProps<RootStackParamList, "CreateEvent">;

export function CreateEventScreen({ navigation }: Props) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [city, setCity] = useState("");

  const [startDate, setStartDate] = useState("");

  const token = useAuthStore((state) => state.token);

  const handleCreateEvent = async () => {
    console.log("BOUTON CREER CLIQUE");

    try {
      console.log("TOKEN", token);

      const result = await createEvent(
        {
          title,
          description,
          city,
          startDate,
        },
        token ?? "",
      );

      console.log("EVENT CREE", result);

      Alert.alert("Succès", "Événement créé avec succès");

      navigation.goBack();
    } catch (error) {
      console.log("ERREUR CREATE EVENT", error);

      Alert.alert("Erreur", "Impossible de créer l'événement");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nouvel événement</Text>

      <AppInput placeholder="Titre" value={title} onChangeText={setTitle} />

      <AppInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <AppInput placeholder="Ville" value={city} onChangeText={setCity} />

      <AppInput
        placeholder="Date ISO (2026-08-15T20:00:00.000Z)"
        value={startDate}
        onChangeText={setStartDate}
      />

     <AppButton
  title="Créer l'événement"
  onPress={handleCreateEvent}
/>
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
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
});
