import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { APP_DEFAULTS } from "../config/appDefaults";

type ToastVariant = "default" | "destructive" | "success";

interface Toast {
  id: number;
  variant: ToastVariant;
  title: string;
  description: string;
}

interface ToastStore {
  toast: Toast | null;
  showToast: (
    variant: ToastVariant,
    title: string,
    description: string,
  ) => void;
  clearToast: () => void;
}

const TOAST_DURATION_MS = APP_DEFAULTS.toastDurationMs;

let toastCounter = 0;
let autoDismissTimer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastStore>()(
  devtools(
    (set) => ({
      toast: null,
      showToast: (variant, title, description) => {
        if (autoDismissTimer) {
          clearTimeout(autoDismissTimer);
        }

        toastCounter += 1;
        const id = toastCounter;

        set({ toast: { id, variant, title, description } });

        autoDismissTimer = setTimeout(() => {
          set((state) => {
            if (state.toast?.id === id) {
              return { toast: null };
            }
            return state;
          });
          autoDismissTimer = null;
        }, TOAST_DURATION_MS);
      },
      clearToast: () => {
        if (autoDismissTimer) {
          clearTimeout(autoDismissTimer);
          autoDismissTimer = null;
        }
        set({ toast: null });
      },
    }),
    { name: "ToastStore" },
  ),
);
