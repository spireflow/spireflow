import { useState } from "react";

import { useAppStore } from "../../store/appStore";
import { signOut } from "../../lib/auth-client";
import { isPresentationModeClient } from "../../utils/presentationMode";

/**
 * Handles user logout via Better Auth. Shows alert in presentation mode.
 * Reloads page on success to clear session state.
 *
 * @returns {Object} Logout handler and state
 * @returns {Function} handleLogout - Async logout function
 * @returns {boolean} loading - Loading state
 * @returns {string} error - Error message if logout fails
 */
export const useHandleLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setIsLoggingOut = useAppStore((state) => state.setIsLoggingOut);

  const handleLogout = async () => {
    // Check if running in presentation mode (no backend)
    if (isPresentationModeClient()) {
      alert(
        "Authentication is disabled in the demo version. Check README.md to find information on how to connect the backend to make it work."
      );
      return;
    }

    setLoading(true);
    setIsLoggingOut(true);

    try {
      await signOut();

      window.location.reload();
    } catch (err: unknown) {
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
