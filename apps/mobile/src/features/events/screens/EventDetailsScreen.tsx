import { useEffect, useState } from "react";

import { View, Text, StyleSheet, Button } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import {
  getEvent,
  joinEvent,
  leaveEvent,
  favoriteEvent,
  unfavoriteEvent,
  deleteEvent,
} from "../../../services/event";

import { useAuthStore } from "../../../store/authStore";

type Props = NativeStackScreenProps<RootStackParamList, "EventDetails">;

export function EventDetailsScreen({ route, navigation }: Props) {
  const [event, setEvent] = useState<any>(null);

  const token = useAuthStore((state) => state.token);

  const user = useAuthStore((state) => state.user);

  const isParticipant = event?.participantList?.some(
    (participant: any) => participant.id === user?.id,
  );

  const isFavorite = event?.favoriteList?.some(
    (favorite: any) => favorite.id === user?.id,
  );

  const isOwner = event?.createdById === user?.id;

  const refreshEvent = async () => {
    const updatedEvent = await getEvent(route.params.eventId);

    setEvent(updatedEvent);
  };

  const handleJoin = async () => {
    try {
      await joinEvent(route.params.eventId, token ?? "");

      await refreshEvent();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    navigation.navigate("EditEvent", {
      eventId: route.params.eventId,
    });
  };

  const handleLeave = async () => {
    try {
      await leaveEvent(route.params.eventId, token ?? "");

      await refreshEvent();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await unfavoriteEvent(route.params.eventId, token ?? "");
      } else {
        await favoriteEvent(route.params.eventId, token ?? "");
      }

      await refreshEvent();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(route.params.eventId, token ?? "");

      navigation.goBack();
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

      <Text>💃 {event.danceType}</Text>

      <Text>📍 {event.address}</Text>

      <Text>📍 {event.city}</Text>

      <Text>📅 {new Date(event.startDate).toLocaleString()}</Text>

      <Text>
        👤 {event.createdBy.firstName} {event.createdBy.lastName}
      </Text>

      <Text style={styles.description}>{event.description}</Text>

      <Text>👥 {event.participantsCount} participant(s)</Text>

      <Text
        style={{
          marginTop: 20,
          fontWeight: "bold",
        }}
      >
        Participants
      </Text>

      {event.participantList?.map((participant: any) => (
        <Text key={participant.id}>
          • {participant.firstName} {participant.lastName}
        </Text>
      ))}

      <Button
        title={isFavorite ? "💔 Retirer des favoris" : "❤️ Ajouter aux favoris"}
        onPress={handleFavorite}
      />

      <Button
        title={isParticipant ? "Quitter l'événement" : "Je participe"}
        onPress={isParticipant ? handleLeave : handleJoin}
      />

      {isOwner && (
        <>
          <Button title="Modifier" onPress={handleEdit} />

          <Button title="Supprimer" onPress={handleDelete} />
        </>
      )}
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
    marginBottom: 20,
  },
});
