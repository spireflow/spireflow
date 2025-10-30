import React from "react";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useHandleLogin } from "../../hooks/auth/useHandleLogin";
import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { ContainedButton } from "../common/ContainedButton";
import { Input } from "../forms/Input";
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

  return (
    <div className="w-full md:w-[18.5rem] 1xl:w-[20rem] flex flex-col items-center mb-2">
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
              <Input
                {...field}
                autoComplete="new-password"
                type="text"
                placeholder={t("yourEmail")}
                icon={<MailIcon />}
                onInput={() => setShowPasswordError(false)}
                maxLength={20}
              />
            )}
          />
        </div>
        {errors.email && showEmailError && (
          <div className="hidden md:block absolute left-[22.2rem] 1xl:left-[23.5rem] top-[9.4rem] 1xl:top-[11rem] z-50 min-w-[20rem] w-auto">
            <div className="relative">
              <div className="bg-secondaryBg bg-inputBg text-primaryText inline text-xs rounded p-2 px-4 w-full right-0 bottom-full border border-inputBorder rounded-md">
                {errors.email.message}
              </div>
            </div>
          </div>
        )}
        <div className="mb-1 w-full relative h-[2.7rem]">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="new-password"
                type="password"
                placeholder={t("yourPassword")}
                icon={<PasswordIcon />}
                onInput={() => setShowEmailError(false)}
                maxLength={20}
              />
            )}
          />
        </div>
        {errors.password && showPasswordError && (
          <div className="absolute hidden md:block left-[22.2rem] 1xl:left-[23.5rem] top-[13rem] 1xl:top-[14.5rem] 1xl:top-[14.9rem] z-50 min-w-[20rem] w-auto">
            <div className="relative mb-8">
              <div className="bg-secondaryBg bg-inputBg text-primaryText text-xs rounded p-2 px-4 inline right-0 bottom-full border border-inputBorder rounded-md">
                {errors.password.message}
              </div>
            </div>
          </div>
        )}
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
        <div className="flex justify-center items-center w-4/5 mt-4 1xl:mt-6 h-[2.5rem]">
          <ContainedButton
            disabled={isLoggingIn}
            type="submit"
            className="ignore-error-hide"
          >
            {isLoggingIn ? (
              <div className="pt-[0.3rem]">
                <SpinnerIcon width={45} height={45} />
              </div>
            ) : (
              "Login"
            )}
          </ContainedButton>
        </div>
        <div className="w-full text-xs 1xl:text-sm flex justify-center gap-2 mt-4 1xl:mt-6">
          <div className="text-primaryText">{t("noAccount")}</div>
          <div
            onClick={switchToSignUp}
            className="text-coloredText text-semibold cursor-pointer hover:text-coloredTextHover ignore-error-hide"
          >
            {t("registerHere")}
          </div>
        </div>
      </form>
    </div>
  );
};
