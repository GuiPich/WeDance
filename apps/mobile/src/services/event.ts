import { api } from "./api";

export async function getEvents() {
  const response = await api.get("/events");

  return response.data;
}

export async function createEvent(
  data: {
    title: string;
    description?: string;
    city: string;
    startDate: string;
  },
  token: string,
) {
  const response = await api.post("/events", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getEvent(id: string) {
  const response = await api.get(`/events/${id}`);

  return response.data;
}

export async function joinEvent(eventId: string, token: string) {
  const response = await api.post(
    `/events/${eventId}/join`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
}

export async function leaveEvent(eventId: string, token: string) {
  const response = await api.delete(`/events/${eventId}/join`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function favoriteEvent(eventId: string, token: string) {
  return api.post(
    `/events/${eventId}/favorite`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function unfavoriteEvent(eventId: string, token: string) {
  return api.delete(`/events/${eventId}/favorite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
