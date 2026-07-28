import { api } from "./api";

export async function getMe(token: string) {
  const response = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/register", data);

  return response.data;
}
