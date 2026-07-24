import { useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import { getEvent } from "../../../services/event";

import { Button } from "react-native";

import { useAuthStore } from "../../../store/authStore";

import { joinEvent } from "../../../services/event";

type Props = NativeStackScreenProps<RootStackParamList, "EventDetails">;

export function EventDetailsScreen({ route }: Props) {
  const [event, setEvent] = useState<any>(null);

  const token = useAuthStore((state) => state.token);

  const handleJoin = async () => {
    try {
      await joinEvent(route.params.eventId, token ?? "");

      const updatedEvent = await getEvent(route.params.eventId);

      setEvent(updatedEvent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await getEvent(route.params.eventId);

      setEvent(data);
    };

    void load();
  }, [route.params.eventId]);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>

      <Text>📍 {event.city}</Text>

      <Text>📅 {new Date(event.startDate).toLocaleString()}</Text>

      <Text>
        👤 {event.createdBy.firstName} {event.createdBy.lastName}
      </Text>

      <Text style={styles.description}>{event.description}</Text>

      <Text>
        👥 {event.participantsCount}
        participant(s)
      </Text>

      <Button title="Je participe" onPress={handleJoin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  description: {
    marginTop: 20,
  },
});
