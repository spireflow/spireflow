import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { useHandleLogin } from "../../hooks/auth/useHandleLogin";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { EyeOffIcon } from "../../assets/icons/EyeOffIcon";
import { Button } from "../common/shadcn/button";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "../common/shadcn/input-group";
import { useAppStore } from "../../store/appStore";

export interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  switchToSignUp?: () => void;
}

export const LoginForm = ({ switchToSignUp }: LoginFormProps) => {
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
  } = useHandleLogin();

  const t = useTranslations("navbar");

  const isLoggingIn = useAppStore((state) => state.isLoggingIn);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full sm:max-w-[20rem] md:w-[18.5rem] 1xl:w-[20rem] flex flex-col items-center">
      <h1 className="text-3xl 1xl:text-4xl font-bold mb-12 1xl:mb-16 mt-2 1xl:mt-4 text-primaryText">
        {t("signIn")}
      </h1>
      <form
        className="w-full flex flex-col gap-4 items-center"
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
                  autoComplete="new-password"
                  type="text"
                  placeholder={t("yourEmail")}
                  onInput={() => setShowPasswordError(false)}
                  maxLength={20}
                  fixedHeight
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>
            )}
          />
          {errors.email && showEmailError && (
            <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 min-w-[20rem] w-auto">
              <div className="relative">
                <div className="bg-secondaryBg bg-inputBg text-primaryText inline text-xs rounded p-2 px-4 w-full right-0 bottom-full border border-inputBorder rounded-md">
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
                  onInput={() => setShowEmailError(false)}
                  maxLength={20}
                  fixedHeight
                />
                <InputGroupAddon>
                  <PasswordIcon />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" className={`pr-1 transition-opacity ${showPassword ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
                  <InputGroupButton
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            )}
          />
          {errors.password && showPasswordError && (
            <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 min-w-[20rem] w-auto">
              <div className="relative">
                <div className="bg-secondaryBg bg-inputBg text-primaryText text-xs rounded p-2 px-4 inline right-0 bottom-full border border-inputBorder rounded-md">
                  {errors.password.message}
                </div>
              </div>
            </div>
          )}
        </div>
        {/* On mobile I used standard red text for errors instead of tooltips to save space */}
        {!authErrorDisplayed && errors.email && showEmailError && (
          <p className="text-sm text-red-500 -mb-2 md:hidden text-left w-full">
            {errors.email.message}
          </p>
        )}
        {!authErrorDisplayed && errors.password && showPasswordError && (
          <p className="text-sm text-red-500 -mb-3 md:hidden text-left w-full">
            {errors.password.message}
          </p>
        )}
        {authErrorDisplayed && (
          <p className="text-sm text-red-500 -mb-3 text-left w-full">{authErrorDisplayed}</p>
        )}
        <div className="flex flex-col items-center w-full mt-4 1xl:mt-6">
          <div className="w-4/5 h-[2.5rem]">
            <Button
              loading={isLoggingIn}
              type="submit"
              className="w-full h-full ignore-error-hide"
            >
              Login
            </Button>
          </div>
          <div className="w-full text-xs 1xl:text-sm flex justify-center gap-2 mt-6 1xl:mt-8">
            <div className="text-primaryText">{t("noAccount")}</div>
            <button
              type="button"
              onClick={switchToSignUp}
              className="text-coloredText text-semibold cursor-pointer hover:text-coloredTextHover ignore-error-hide"
            >
              {t("registerHere")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
