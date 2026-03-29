"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller } from "react-hook-form";

import { EyeIcon } from "@/assets/icons/EyeIcon";
import { EyeOffIcon } from "@/assets/icons/EyeOffIcon";
import { MailIcon } from "@/assets/icons/MailIcon";
import { PasswordIcon } from "@/assets/icons/PasswordIcon";
import { useHandleLogin } from "@/hooks/auth/useHandleLogin";
import { Link } from "@/i18n/navigation";
import { useLayoutStore } from "@/store/layoutStore";

import { Button } from "../common/shadcn/button";
import { Checkbox } from "../common/shadcn/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../common/shadcn/input-group";

export interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  switchToSignUp?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginForm = ({
  switchToSignUp,
  onLoginSuccess,
}: LoginFormProps) => {
  const {
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    authErrorDisplayed,
    handleSubmit,
    onSubmit,
    control,
    errors,
  } = useHandleLogin(onLoginSuccess);

  const t = useTranslations("auth");

  const isLoggingIn = useLayoutStore((state) => state.isLoggingIn);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="w-full sm:max-w-84 md:w-78 1xl:w-84 flex flex-col items-center">
      <h1 className="text-4xl sm:text-3xl 1xl:text-4xl font-bold mb-12 1xl:mb-16 mt-2 1xl:mt-4 text-primaryText">
        {t("signIn")}
      </h1>
      <form
        className="w-full flex flex-col gap-4 items-center"
        onSubmit={handleSubmit((data) => onSubmit(data, rememberMe))}
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
                    errors.email ? "login-email-error" : undefined
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
              id="login-email-error"
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
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("yourPassword")}
                  aria-label={t("yourPassword")}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "login-password-error" : undefined
                  }
                  onInput={() => setShowEmailError(false)}
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
              id="login-password-error"
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
        {/* On mobile I used standard red text for errors instead of tooltips to save space */}
        {!authErrorDisplayed && errors.email && showEmailError && (
          <p
            role="alert"
            className="text-sm text-red-500 -mt-1 md:hidden text-left w-full"
          >
            {errors.email.message}
          </p>
        )}
        {!authErrorDisplayed && errors.password && showPasswordError && (
          <p
            role="alert"
            className="text-sm text-red-500 -mt-1 md:hidden text-left w-full"
          >
            {errors.password.message}
          </p>
        )}
        {authErrorDisplayed && (
          <p
            role="alert"
            className="text-sm text-red-500 -mt-1 text-left w-full"
          >
            {authErrorDisplayed}
          </p>
        )}
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <label
              htmlFor="rememberMe"
              className="text-sm text-primaryText cursor-pointer select-none"
            >
              {t("rememberMe")}
            </label>
          </div>
          <Link
            href="/forgot-password"
            tabIndex={0}
            className="text-xs 1xl:text-sm text-coloredText cursor-pointer hover:text-coloredTextHover"
          >
            {t("forgotPassword")}
          </Link>
        </div>
        <div className="flex flex-col items-center w-full mt-4 1xl:mt-6">
          <div className="w-4/5 h-10">
            <Button
              loading={isLoggingIn}
              type="submit"
              className="w-full h-full ignore-error-hide"
            >
              {t("signIn")}
            </Button>
          </div>
          <div className="w-full text-xs 1xl:text-sm flex justify-center gap-2 mt-6 1xl:mt-8">
            <div className="text-primaryText">{t("noAccount")}</div>
            {switchToSignUp ? (
              <button
                type="button"
                tabIndex={0}
                onClick={switchToSignUp}
                className="text-coloredText cursor-pointer hover:text-coloredTextHover ignore-error-hide"
              >
                {t("registerHere")}
              </button>
            ) : (
              <Link
                href="/register"
                tabIndex={0}
                className="text-coloredText cursor-pointer hover:text-coloredTextHover ignore-error-hide"
              >
                {t("registerHere")}
              </Link>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
