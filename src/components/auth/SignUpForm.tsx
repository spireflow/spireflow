"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { EyeIcon } from "../../assets/icons/EyeIcon";
import { EyeOffIcon } from "../../assets/icons/EyeOffIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { useHandleSignUp } from "../../hooks/auth/useHandleSignUp";
import { Link } from "../../i18n/navigation";
import { Button } from "../common/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../common/shadcn/input-group";

export interface SignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  switchToSignIn?: () => void;
  onSignUpSuccess?: () => void;
}

export const SignUpForm = ({
  switchToSignIn,
  onSignUpSuccess,
}: SignUpFormProps) => {
  const {
    loading,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    showConfirmPasswordError,
    setShowConfirmPasswordError,
    signUpError,
    handleSubmit,
    onSubmit,
    control,
    errors,
  } = useHandleSignUp(onSignUpSuccess);

  const t = useTranslations("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full sm:max-w-84 md:w-78 1xl:w-84 flex flex-col items-center">
      <h1 className="text-4xl sm:text-3xl 1xl:text-4xl font-bold mb-12 1xl:mb-16 mt-2 1xl:mt-4 text-primaryText">
        {t("signUp")}
      </h1>
      <form
        className="w-full flex flex-col gap-3 3xl:gap-4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-1 w-full relative h-[2.7rem]">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputGroup className="h-full">
                <InputGroupInput
                  {...field}
                  autoComplete="email"
                  type="text"
                  placeholder={t("yourEmail")}
                  aria-label={t("yourEmail")}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "signup-email-error" : undefined
                  }
                  onInput={() => setShowPasswordError(false)}
                  maxLength={40}
                  fixedHeight
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
          {errors.email && showEmailError && (
            <div
              id="signup-email-error"
              role="alert"
              className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 min-w-80 w-auto"
            >
              <div className="relative">
                <div className="bg-authErrorTooltipBg text-primaryText inline text-xs rounded p-2 px-4 w-full right-0 bottom-full border border-inputBorder rounded-md">
                  {errors.email.message}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mb-1 w-full relative h-[2.7rem]">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputGroup className="h-full group">
                <InputGroupInput
                  {...field}
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("yourPassword")}
                  aria-label={t("yourPassword")}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "signup-password-error" : undefined
                  }
                  onInput={() => {
                    setShowEmailError(false);
                    setShowConfirmPasswordError(false);
                  }}
                  maxLength={40}
                  fixedHeight
                />
                <InputGroupAddon>
                  <PasswordIcon />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  className={`pr-1 transition-opacity ${showPassword ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}
                >
                  <InputGroupButton
                    className="h-7 px-1"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? t("hidePassword") : t("showPassword")
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            )}
          />
          {errors.password && showPasswordError && (
            <div
              id="signup-password-error"
              role="alert"
              className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 min-w-80 w-auto"
            >
              <div className="relative">
                <div className="bg-authErrorTooltipBg text-primaryText text-xs rounded p-2 px-4 inline right-0 bottom-full border border-inputBorder rounded-md">
                  {errors.password.message}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mb-1 w-full relative h-[2.7rem]">
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <InputGroup className="h-full group">
                <InputGroupInput
                  {...field}
                  autoComplete="new-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("confirmPassword")}
                  aria-label={t("confirmPassword")}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={
                    errors.confirmPassword
                      ? "signup-confirm-password-error"
                      : undefined
                  }
                  onInput={() => {
                    setShowEmailError(false);
                    setShowPasswordError(false);
                  }}
                  maxLength={40}
                  fixedHeight
                />
                <InputGroupAddon>
                  <PasswordIcon />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  className={`pr-1 transition-opacity ${showConfirmPassword ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}
                >
                  <InputGroupButton
                    className="h-7 px-1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? t("hidePassword")
                        : t("showPassword")
                    }
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            )}
          />
          {errors.confirmPassword && showConfirmPasswordError && (
            <div
              id="signup-confirm-password-error"
              role="alert"
              className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 min-w-80 w-auto"
            >
              <div className="relative">
                <div className="bg-authErrorTooltipBg text-primaryText text-xs rounded p-2 px-4 inline right-0 bottom-full border border-inputBorder rounded-md">
                  {errors.confirmPassword.message}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* On mobile I used for errors standard red text instead of tooltips to save space */}
        {errors.email && showEmailError && (
          <p
            role="alert"
            className="text-sm text-red-500 -mb-2 md:hidden text-left w-full"
          >
            {errors.email.message}
          </p>
        )}
        {errors.password && showPasswordError && (
          <p
            role="alert"
            className="text-sm text-red-500 -mb-3 md:hidden text-left w-full"
          >
            {errors.password.message}
          </p>
        )}
        {errors.confirmPassword && showConfirmPasswordError && (
          <p
            role="alert"
            className="text-sm text-red-500 -mb-3 md:hidden text-left w-full"
          >
            {errors.confirmPassword.message}
          </p>
        )}
        {signUpError && (
          <p
            role="alert"
            className="text-sm text-red-500 -mb-3 text-left w-full"
          >
            {signUpError}
          </p>
        )}
        <div className="flex flex-col items-center w-full mt-4 1xl:mt-6">
          <div className="w-4/5 h-10">
            <Button
              loading={loading}
              type="submit"
              className="w-full h-full ignore-error-hide"
            >
              {t("createAccount")}
            </Button>
          </div>
          <div className="w-full text-xs 1xl:text-sm flex justify-center gap-2 mt-6 1xl:mt-8">
            <div className="text-primaryText">{t("alreadyHaveAccount")}</div>
            {switchToSignIn ? (
              <button
                type="button"
                onClick={switchToSignIn}
                className="text-coloredText text-semibold cursor-pointer hover:text-coloredTextHover ignore-error-hide"
              >
                {t("signInHere")}
              </button>
            ) : (
              <Link
                href="/login"
                className="text-coloredText text-semibold cursor-pointer hover:text-coloredTextHover ignore-error-hide"
              >
                {t("signInHere")}
              </Link>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
