import { useEffect } from "react";

import { getToken } from "../services/storage";

import { useAuthStore } from "../store/authStore";

export function useAuthBootstrap() {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const init = async () => {
      const token = await getToken();

      if (token) {
        await login(token);
      }
    };

    void init();
  }, [login]);
}
