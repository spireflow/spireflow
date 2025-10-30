import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignUpData } from "../../components/auth/SignUpForm";
import { signUp } from "../../lib/auth-client";

export const useHandleSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const router = useRouter();
  const t = useTranslations("navbar");

  const handleSignUp = async (data: SignUpData) => {
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
        const errorMessage = mapSignUpError(error.message || error.code || "UNKNOWN_ERROR");
        setSignUpError(errorMessage);
        return;
      }

      // Success - DON'T remove spinner, let it stay until page reloads
      router.push("/");
      location.reload();
    } catch (error) {
      setLoading(false);
      console.error("Sign up error:", error);
      setSignUpError(t("authErrors.networkError"));
    }
  };

  // Map Better Auth error messages to translation keys
  const mapSignUpError = (errorMessage: string): string => {
    if (errorMessage.includes("already exists") || errorMessage.includes("User already exists")) {
      return t("authErrors.emailAlreadyExists");
    }
    if (errorMessage.includes("Invalid email")) {
      return t("authErrors.invalidEmail");
    }
    if (errorMessage.includes("Password")) {
      return t("authErrors.passwordError");
    }
    return t("authErrors.defaultError");
  };

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

  const onSubmit = async (data: SignUpData) => {
    await handleSignUp(data);
  };

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
