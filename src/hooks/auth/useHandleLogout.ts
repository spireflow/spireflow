import { useState } from "react";

import { useAppStore } from "../../store/appStore";
import { signOut } from "../../lib/auth-client";

export const useHandleLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setIsLoggingOut = useAppStore((state) => state.setIsLoggingOut);

  const handleLogout = async () => {
    setLoading(true);
    setIsLoggingOut(true);

    try {
      await signOut();

      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
      if (err instanceof Error) {
        setError(`Logout error: ${err.message}`);
      } else {
        setError("Logout failed due to an unknown error");
      }
      setIsLoggingOut(false);
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};
