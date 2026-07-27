import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import * as Location from "expo-location";

import DateTimePicker from "@react-native-community/datetimepicker";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import { AppInput } from "../../../components/AppInput";
import { AppButton } from "../../../components/AppButton";

import { createEvent } from "../../../services/event";

import { useAuthStore } from "../../../store/authStore";

import { DANCES } from "../../../constants/dances";
import { COLORS } from "../../../constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "CreateEvent">;

export function CreateEventScreen({ navigation }: Props) {
  const token = useAuthStore((state) => state.token);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [city, setCity] = useState("");

  const [address, setAddress] = useState("");

  const [danceType, setDanceType] = useState("Salsa");

  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateEvent = async () => {
    try {
      if (!title || !city || !address) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
        return;
      }

      const geocodingResult = await Location.geocodeAsync(address);

      if (geocodingResult.length === 0) {
        Alert.alert("Erreur", "Adresse introuvable.");
        return;
      }

      const coordinates = geocodingResult[0];

      await createEvent(
        {
          title,
          description,
          city,

          address,

          startDate: date.toISOString(),

          latitude: coordinates.latitude,

          longitude: coordinates.longitude,

          danceType,
        },
        token ?? "",
      );

      Alert.alert("Succès", "Événement créé avec succès");

      navigation.goBack();
    } catch (error) {
      console.log(error);

      Alert.alert("Erreur", "Impossible de créer l'événement");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Text style={styles.title}>Nouvel événement</Text>

      <AppInput placeholder="Titre" value={title} onChangeText={setTitle} />

      <AppInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <AppInput placeholder="Ville" value={city} onChangeText={setCity} />

      <AppInput
        placeholder="Adresse complète"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Date et heure</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>📅 {date.toLocaleString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Type de danse</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {DANCES.map((dance) => (
          <TouchableOpacity
            key={dance}
            onPress={() => setDanceType(dance)}
            style={[
              styles.danceChip,
              danceType === dance && styles.danceChipActive,
            ]}
          >
            <Text
              style={[
                styles.danceChipText,
                danceType === dance && styles.danceChipTextActive,
              ]}
            >
              {dance}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View
        style={{
          marginTop: 30,
        }}
      >
        <AppButton title="Créer l'événement" onPress={handleCreateEvent} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: COLORS.text,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: COLORS.text,
  },

  dateButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#FAFAFA",
  },

  dateButtonText: {
    color: COLORS.text,
    fontSize: 15,
  },

  danceChip: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },

  danceChipActive: {
    backgroundColor: COLORS.primary,
  },

  danceChipText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  danceChipTextActive: {
    color: COLORS.textWhite,
  },
});
