import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoginData } from "../../components/auth/LoginForm";
import { useRouter } from "../../i18n/navigation";
import { signIn } from "../../services/auth/auth-client";
import { useAppStore } from "../../store/appStore";
import { isPresentationModeClient } from "../../utils/presentationMode";

const SUBMIT_COOLDOWN_MS = 2000;

/**
 * Login form management with Better Auth integration.
 * Handles validation (Yup), error display, and i18n error mapping.
 * Includes protection against rapid-fire submissions (e.g., holding Enter key)
 * with a 2-second cooldown between submit attempts.
 *
 * @returns {Object} Form handlers, validation, and state
 * @returns {Function} handleLogin - Async login handler
 * @returns {Function} onSubmit - Form submit handler (debounced)
 * @returns {Object} control - React Hook Form control
 * @returns {Object} errors - Form validation errors
 * @returns {string} authError - Authentication error message
 */
export const useHandleLogin = () => {
  const [authError, setAuthError] = useState<string>("");

  const router = useRouter();
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [authErrorDisplayed, setAuthErrorDisplayed] = useState("");
  const t = useTranslations("auth");

  const setIsLoggingIn = useAppStore((state) => state.setIsLoggingIn);
  const clearAuthError = () => setAuthError("");

  /** Refs for preventing rapid-fire form submissions (e.g., holding Enter key) */
  const isSubmittingRef = useRef(false);
  const lastSubmitTimeRef = useRef(0);

  /** Map Better Auth error messages to translation keys */
  const mapBetterAuthError = useCallback(
    (errorMessage: string): string => {
      const lowerError = errorMessage.toLowerCase();

      /** Better Auth returns INVALID_EMAIL_OR_PASSWORD for both wrong email and wrong password */
      if (
        lowerError.includes("invalid email or password") ||
        lowerError.includes("invalid_email_or_password")
      ) {
        return t("authErrors.form_password_incorrect");
      }
      if (lowerError.includes("locked") || lowerError.includes("blocked")) {
        return t("authErrors.user_locked");
      }
      if (lowerError.includes("session")) {
        return t("authErrors.session_exists");
      }

      return t("authErrors.defaultError");
    },
    [t],
  );

  const handleLogin = useCallback(
    async (data: LoginData, rememberMe: boolean) => {
      /** Check if running in presentation mode (no backend) */
      if (isPresentationModeClient()) {
        alert(
          "Authentication is disabled in the demo version. Check README.md to find information on how to connect the backend to make it work.",
        );
        return;
      }

      setIsLoggingIn(true);
      setAuthError("");

      const { email, password } = data;

      try {
        const { error } = await signIn.email({ email, password, rememberMe });

        if (error) {
          setIsLoggingIn(false);
          const errorMessage = error.message || error.code || "UNKNOWN_ERROR";
          const translatedError = mapBetterAuthError(errorMessage);
          setAuthError(translatedError);
          return;
        }

        /** Success — redirect to homepage (i18n router preserves locale automatically) */
        router.push("/");
      } catch (error: unknown) {
        setIsLoggingIn(false);
        console.error("Network error during login:", error);
        setAuthError(t("authErrors.networkError"));
      }
    },
    [mapBetterAuthError, router, setIsLoggingIn, t],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .required(t("emailFieldIsRequired"))
          .email(t("pleaseEnterAValidEmail")),
        password: Yup.string()
          .required(t("passwordFieldIsRequired"))
          .min(8, t("passwordMinimumLength")),
      }),
    [t],
  );

  /** Hide error messages when user clicks anywhere on the screen */
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      /** This "error-hide" logic fixes bug that forces double clicking on register/sample button on mobile when errors are visible */
      const target = event.target as HTMLElement;
      if (target.closest(".ignore-error-hide")) {
        return;
      }
      setShowEmailError(false);
      setShowPasswordError(false);
      if (clearAuthError) {
        clearAuthError();
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** Effects necessary to not show both error messages at the same time if not needed */
  useEffect(() => {
    if (errors.email) {
      setShowEmailError(true);
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password) {
      setShowPasswordError(true);
    }
  }, [errors.password]);

  /** Show auth error immediately without delay */
  useEffect(() => {
    if (authError) {
      setAuthErrorDisplayed(authError);
    } else {
      setAuthErrorDisplayed("");
    }
  }, [authError]);

  const onSubmit = useCallback(
    async (data: LoginData, rememberMe: boolean) => {
      const now = Date.now();

      /** Prevent rapid-fire submissions (e.g., user holding Enter key) */
      if (isSubmittingRef.current) {
        return;
      }

      /** Enforce cooldown between submissions to prevent spam */
      if (now - lastSubmitTimeRef.current < SUBMIT_COOLDOWN_MS) {
        return;
      }

      isSubmittingRef.current = true;
      lastSubmitTimeRef.current = now;

      try {
        await handleLogin(data, rememberMe);
      } catch (error: unknown) {
        console.error("Login process error:", error);
        setIsLoggingIn(false);
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [handleLogin, setIsLoggingIn],
  );

  return {
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    authErrorDisplayed,
    onSubmit,
    handleSubmit,
    control,
    errors,
  };
};
