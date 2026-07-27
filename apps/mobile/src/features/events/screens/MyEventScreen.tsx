import { useEffect, useState } from "react";

import { View, Text, FlatList } from "react-native";

import { getMyEvents } from "../../../services/event";

import { useAuthStore } from "../../../store/authStore";

export function MyEventsScreen() {
  const [events, setEvents] = useState<any[]>([]);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const load = async () => {
      const data = await getMyEvents(token ?? "");

      setEvents(data);
    };

    void load();
  }, [token]);

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 16,
            borderWidth: 1,
            marginBottom: 10,
          }}
        >
          <Text>{item.title}</Text>

          <Text>{item.city}</Text>
        </View>
      )}
    />
  );
}
