"use client";

import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useToastStore } from "@/store/toastStore";

import { Alert, AlertDescription, AlertTitle } from "../common/shadcn/alert";

const ICON_MAP = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
} as const;

const ToastItem = ({
  variant,
  title,
  description,
  onClose,
}: {
  variant: "default" | "destructive" | "success";
  title: string;
  description: string;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  /** Double requestAnimationFrame delays mounted flag by two frames so the CSS enter transition actually fires. */
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
  }, []);

  const Icon = ICON_MAP[variant];

  return (
    <div
      data-mounted={mounted}
      className="transform transition-all duration-400 ease-out data-[mounted=false]:translate-y-[calc(100%+3rem)] data-[mounted=false]:opacity-0 data-[mounted=true]:translate-y-0 data-[mounted=true]:opacity-100"
    >
      <Alert variant={variant} className="shadow-lg relative pr-10">
        <Icon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <button
          onClick={onClose}
          tabIndex={0}
          className="absolute top-3 right-3 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    </div>
  );
};

export const ToastContainer = () => {
  const toast = useToastStore((s) => s.toast);
  const clearToast = useToastStore((s) => s.clearToast);

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-12 left-4 right-4 xsm:left-[calc(50%+1rem)] xsm:right-auto xsm:-translate-x-1/2 xsm:min-w-80 xsm:max-w-96 z-50"
      role="region"
      aria-label="Notifications"
    >
      <ToastItem
        key={toast.id}
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
        onClose={clearToast}
      />
    </div>
  );
};
