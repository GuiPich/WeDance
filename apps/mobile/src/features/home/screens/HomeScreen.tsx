import { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";
import { getEvents } from "../../../services/event";
import { getMe } from "../../../services/auth";
import { useAuthStore } from "../../../store/authStore";

type Event = {
  id: string;
  title: string;
  description?: string;
  city: string;
  startDate: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [events, setEvents] = useState<Event[]>([]);

  const token = useAuthStore((state) => state.token);

  const user = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);

  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        return;
      }

      try {
        const profile = await getMe(token);

        setUser(profile);
      } catch (error) {
        console.log(error);
      }
    };

    void loadProfile();
  }, [token, setUser]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();

        console.log("EVENTS RECUPERES", data);

        setEvents(data);
      } catch (error) {
        console.log("ERREUR EVENTS", error);
      }
    };

    void loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WeDance 🎉</Text>

      <Text style={styles.subtitle}>
        Bonjour {user?.firstName ?? "Danseur"}
      </Text>

      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateEvent")}
      >
        <Text style={styles.createButtonText}>Créer un événement</Text>
      </TouchableOpacity>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("EventDetails", {
                eventId: item.id,
              })
            }
          >
            <Text style={styles.cardTitle}>{item.title}</Text>

            <Text>📍 {item.city}</Text>

            <Text>📅 {new Date(item.startDate).toLocaleDateString()}</Text>

            {item.description ? (
              <Text style={styles.description}>{item.description}</Text>
            ) : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Aucun événement disponible.</Text>}
      />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          void logout();
        }}
      >
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 20,
    marginTop: 8,
  },

  email: {
    color: "#666",
    marginBottom: 20,
  },

  createButton: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  createButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    marginTop: 8,
  },

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },

  logoutButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
});
