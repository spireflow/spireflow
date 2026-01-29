import { useCallback, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignUpData } from "../../components/auth/SignUpForm";
import { signUp } from "../../lib/auth-client";
import { isPresentationModeClient } from "../../utils/presentationMode";

const SUBMIT_COOLDOWN_MS = 2000;

/**
 * Sign-up form management with Better Auth integration.
 * Handles validation (Yup), error display, and i18n error mapping.
 * Includes protection against rapid-fire submissions (e.g., holding Enter key)
 * with a 2-second cooldown between submit attempts.
 *
 * @returns {Object} Form handlers, validation, and state
 * @returns {Function} handleSignUp - Async sign-up handler
 * @returns {Function} onSubmit - Form submit handler (debounced)
 * @returns {Object} control - React Hook Form control
 * @returns {Object} errors - Form validation errors
 * @returns {boolean} loading - Loading state
 * @returns {string} signUpError - Authentication error message
 */
export const useHandleSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const router = useRouter();
  const t = useTranslations("navbar");

  // Refs for preventing rapid-fire form submissions (e.g., holding Enter key)
  const isSubmittingRef = useRef(false);
  const lastSubmitTimeRef = useRef(0);

  // Map Better Auth error messages to translation keys
  const mapSignUpError = useCallback((errorMessage: string): string => {
    if (
      errorMessage.includes("already exists") ||
      errorMessage.includes("User already exists")
    ) {
      return t("authErrors.emailAlreadyExists");
    }
    if (errorMessage.includes("Invalid email")) {
      return t("authErrors.invalidEmail");
    }
    if (errorMessage.includes("Password")) {
      return t("authErrors.passwordError");
    }
    return t("authErrors.defaultError");
  }, [t]);

  const handleSignUp = useCallback(async (data: SignUpData) => {
    // Check if running in presentation mode (no backend)
    if (isPresentationModeClient()) {
      alert(
        "Authentication is disabled in the demo version on Vercel. Check README.md to find information on how to connect the backend to make it work."
      );
      return;
    }

    setLoading(true);
    setSignUpError("");

    try {
      const { error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.email,
      });

      if (error) {
        setLoading(false);
        // Map Better Auth errors to user-friendly messages
        const errorMessage = mapSignUpError(
          error.message || error.code || "UNKNOWN_ERROR"
        );
        setSignUpError(errorMessage);
        return;
      }

      // Success - DON'T remove spinner, let it stay until page reloads
      router.push("/");
      location.reload();
    } catch (error: unknown) {
      setLoading(false);
      console.error("Sign up error:", error);
      setSignUpError(t("authErrors.networkError"));
    }
  }, [mapSignUpError, router, t]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("emailFieldIsRequired"))
      .email(t("pleaseEnterAValidEmail")),
    password: Yup.string()
      .required(t("passwordFieldIsRequired"))
      .min(6, t("passwordMinimumLength")),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  const onSubmit = useCallback(async (data: SignUpData) => {
    const now = Date.now();

    // Prevent rapid-fire submissions (e.g., user holding Enter key)
    if (isSubmittingRef.current) {
      return;
    }

    // Enforce cooldown between submissions to prevent spam
    if (now - lastSubmitTimeRef.current < SUBMIT_COOLDOWN_MS) {
      return;
    }

    isSubmittingRef.current = true;
    lastSubmitTimeRef.current = now;

    try {
      await handleSignUp(data);
    } finally {
      isSubmittingRef.current = false;
    }
  }, [handleSignUp]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // This "error-hide" logic fixes bug that forces double clicking on login button on mobile when errors are visible
      const target = event.target as HTMLElement;
      if (target.closest(".ignore-error-hide")) {
        return;
      }
      setShowEmailError(false);
      setShowPasswordError(false);
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  // Effects necessary to not show both error messages at the same time if not needed
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

  return {
    handleSignUp,
    loading,
    setLoading,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    signUpError,
    handleSubmit,
    onSubmit,
    control,
    errors,
  };
};
