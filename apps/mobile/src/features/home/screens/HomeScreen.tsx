import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../types/navigation";

import { getEvents } from "../../../services/event";
import { getMe } from "../../../services/auth";
import { getCurrentLocation } from "../../../services/location";

import { useAuthStore } from "../../../store/authStore";

import { COLORS } from "../../../constants/colors";

import { getDistance } from "geolib";

import { DANCES } from "../../../constants/dances";

type Event = {
  id: string;
  title: string;
  description?: string;
  city: string;
  startDate: string;
  latitude?: number;
  longitude?: number;
  danceType?: string;
  distanceKm?: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [events, setEvents] = useState<Event[]>([]);

  const [search, setSearch] = useState("");

  const [selectedDance, setSelectedDance] = useState("Tous");

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const token = useAuthStore((state) => state.token);

  const user = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);

  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

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
    const loadLocation = async () => {
      try {
        const location = await getCurrentLocation();

        setUserLocation(location);
      } catch (error) {
        console.log(error);
      }
    };

    void loadLocation();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadEvents = async () => {
        try {
          const data = await getEvents();

          setEvents(data);
        } catch (error) {
          console.log(error);
        }
      };

      void loadEvents();
    }, []),
  );

  const eventsWithDistance = events.map((event) => {
    if (!userLocation || !event.latitude || !event.longitude) {
      return event;
    }

    const distance = getDistance(
      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      {
        latitude: event.latitude,
        longitude: event.longitude,
      },
    );

    return {
      ...event,
      distanceKm: (distance / 1000).toFixed(1),
    };
  });

  const filteredEvents = eventsWithDistance.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDance =
      selectedDance === "Tous" ? true : event.danceType === selectedDance;

    return matchesSearch && matchesDance;
  });

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => Number(a.distanceKm ?? 9999) - Number(b.distanceKm ?? 9999),
  );

  const dances = ["Tous", ...DANCES];

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logoText.png")}
        style={styles.logo}
      />

      <View style={styles.userSection}>
        <View>
          <Text style={styles.userName}>
            Bonjour {user?.firstName ?? "Danseur"}
          </Text>

          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            void logout();
          }}
        >
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Rechercher..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {dances.map((dance) => (
          <TouchableOpacity
            key={dance}
            onPress={() => setSelectedDance(dance)}
            style={[
              styles.danceChip,
              selectedDance === dance && styles.danceChipActive,
            ]}
          >
            <Text
              style={[
                styles.danceChipText,
                selectedDance === dance && styles.danceChipTextActive,
              ]}
            >
              {dance}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Événements proches</Text>

        <Text style={styles.summarySubtitle}>
          {sortedEvents.length} événement(s)
        </Text>
      </View>

      <FlatList
        data={sortedEvents}
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

            <Text>💃 {item.danceType}</Text>

            <Text>📍 {item.city}</Text>

            <Text>📏 {item.distanceKm ?? "?"} km</Text>

            <Text>📅 {new Date(item.startDate).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.createButtonBottom}
          onPress={() => navigation.navigate("CreateEvent")}
        >
          <Text style={styles.bottomButtonText}>➕ Créer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate("Map")}
        >
          <Text style={styles.bottomButtonText}>📍 Carte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  logo: {
    width: 240,
    height: 90,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 20,
  },

  userSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  email: {
    color: COLORS.textLight,
  },

  logoutButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  logoutText: {
    color: COLORS.textWhite,
    fontWeight: "600",
  },

  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 8,
  },

  searchButton: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 50,
  },

  searchText: {
    fontSize: 18,
  },

  carousel: {
    marginBottom: 16,
    minHeight: 55,
  },

  danceChip: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,

    paddingHorizontal: 16,
    paddingVertical: 10,

    marginRight: 8,
    marginVertical: 4,

    justifyContent: "center",
    alignItems: "center",
  },

  danceChipActive: {
    backgroundColor: COLORS.primary,
  },

  danceChipText: {
    color: COLORS.primary,
    fontWeight: "600",
    lineHeight: 20,
  },

  danceChipTextActive: {
    color: COLORS.textWhite,
  },

  summaryContainer: {
    marginBottom: 12,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  summarySubtitle: {
    color: COLORS.textLight,
  },

  card: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: COLORS.text,
  },

  mapButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    flex: 1,
  },

  mapButtonText: {
    color: COLORS.textWhite,
    fontWeight: "700",
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },
  bottomButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  createButtonBottom: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  bottomButtonText: {
    color: COLORS.textWhite,
    fontWeight: "700",
    fontSize: 16,
  },
});
