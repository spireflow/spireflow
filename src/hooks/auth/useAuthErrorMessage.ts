import { useTranslations } from "next-intl";
import { useCallback } from "react";

/**
 * Maps all Better Auth error codes to i18n translation keys (auth.authErrors namespace).
 * Codes that should show the same message are grouped together.
 *
 * Source: https://github.com/better-auth/better-auth/blob/canary/packages/core/src/error/codes.ts
 */
const AUTH_ERROR_I18N_MAP: Record<string, string> = {
  /** Credentials - same message to prevent user enumeration */
  INVALID_EMAIL_OR_PASSWORD: "INVALID_EMAIL_OR_PASSWORD",
  USER_NOT_FOUND: "INVALID_EMAIL_OR_PASSWORD",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "INVALID_EMAIL_OR_PASSWORD",
  INVALID_USER: "INVALID_EMAIL_OR_PASSWORD",

  /** Email validation */
  INVALID_EMAIL: "INVALID_EMAIL",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  USER_EMAIL_NOT_FOUND: "INVALID_EMAIL",
  EMAIL_MISMATCH: "INVALID_EMAIL",

  /** Password */
  INVALID_PASSWORD: "INVALID_PASSWORD",
  PASSWORD_TOO_SHORT: "PASSWORD_TOO_SHORT",
  PASSWORD_TOO_LONG: "PASSWORD_TOO_LONG",

  /** User exists */
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "USER_ALREADY_EXISTS",

  /** Email verification */
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  VERIFICATION_EMAIL_NOT_ENABLED: "EMAIL_NOT_VERIFIED",
  EMAIL_ALREADY_VERIFIED: "EMAIL_ALREADY_VERIFIED",

  /** Session */
  SESSION_EXPIRED: "SESSION_EXPIRED",
  SESSION_NOT_FRESH: "SESSION_EXPIRED",
  FAILED_TO_CREATE_SESSION: "SESSION_FAILED",
  FAILED_TO_GET_SESSION: "SESSION_FAILED",

  /** Account */
  FAILED_TO_CREATE_USER: "FAILED_TO_CREATE_USER",
  FAILED_TO_UPDATE_USER: "ACCOUNT_ERROR",
  ACCOUNT_NOT_FOUND: "ACCOUNT_ERROR",
  FAILED_TO_UNLINK_LAST_ACCOUNT: "ACCOUNT_ERROR",
  LINKED_ACCOUNT_ALREADY_EXISTS: "ACCOUNT_ERROR",

  /** Token */
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "INVALID_TOKEN",
  FAILED_TO_CREATE_VERIFICATION: "INVALID_TOKEN",

  /** OAuth / Social */
  SOCIAL_ACCOUNT_ALREADY_LINKED: "SOCIAL_ACCOUNT_ALREADY_LINKED",
  PROVIDER_NOT_FOUND: "PROVIDER_ERROR",
  ID_TOKEN_NOT_SUPPORTED: "PROVIDER_ERROR",
  FAILED_TO_GET_USER_INFO: "PROVIDER_ERROR",

  /** Security */
  CROSS_SITE_NAVIGATION_LOGIN_BLOCKED: "SECURITY_ERROR",
  INVALID_ORIGIN: "SECURITY_ERROR",
  MISSING_OR_NULL_ORIGIN: "SECURITY_ERROR",

  /** Request / URL validation */
  INVALID_CALLBACK_URL: "INVALID_REQUEST",
  INVALID_REDIRECT_URL: "INVALID_REQUEST",
  INVALID_ERROR_CALLBACK_URL: "INVALID_REQUEST",
  INVALID_NEW_USER_CALLBACK_URL: "INVALID_REQUEST",
  CALLBACK_URL_REQUIRED: "INVALID_REQUEST",
  FIELD_NOT_ALLOWED: "INVALID_REQUEST",
  MISSING_FIELD: "INVALID_REQUEST",
  ASYNC_VALIDATION_NOT_SUPPORTED: "INVALID_REQUEST",
  METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED: "INVALID_REQUEST",
  BODY_MUST_BE_AN_OBJECT: "INVALID_REQUEST",

  /** Other */
  EMAIL_CAN_NOT_BE_UPDATED: "EMAIL_UPDATE_BLOCKED",
  PASSWORD_ALREADY_SET: "PASSWORD_ALREADY_SET",
  USER_ALREADY_HAS_PASSWORD: "PASSWORD_ALREADY_SET",
  SIGNUP_DISABLED: "SIGNUP_DISABLED",
};

/**
 * Hook that returns a function to resolve Better Auth error codes to translated messages.
 *
 * @param fallbackKey - i18n key for unknown codes (e.g. "signInDefaultError" or "signUpDefaultError")
 */
export const useAuthErrorMessage = (fallbackKey: string) => {
  const t = useTranslations("auth");

  const getErrorMessage = useCallback(
    (errorCode: string): string => {
      const i18nKey = AUTH_ERROR_I18N_MAP[errorCode];
      if (i18nKey) {
        return t(`authErrors.${i18nKey}`);
      }
      return t(`authErrors.${fallbackKey}`);
    },
    [t, fallbackKey],
  );

  return { getErrorMessage, t };
};
