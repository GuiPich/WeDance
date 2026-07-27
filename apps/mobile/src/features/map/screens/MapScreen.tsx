import { useEffect, useState } from "react";

import { View, Text, Platform } from "react-native";

import { getEvents } from "../../../services/event";

import { WebMapScreen } from "./WebMapScreen";

// import { NativeMapScreen } from "./NativeMapScreen";

export function MapScreen() {
  const [events, setEvents] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEvents();

        const validEvents = data.filter(
          (event: any) => event.latitude && event.longitude,
        );

        setEvents(validEvents);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (Platform.OS === "web") {
    return <WebMapScreen events={events} />;
  }

  // return <NativeMapScreen events={events} />;
}
