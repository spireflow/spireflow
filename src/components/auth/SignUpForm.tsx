import React from "react";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { MailIcon } from "../../assets/icons/MailIcon";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../common/shadcn/input-group";
import { ContainedButton } from "../common/ContainedButton";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useHandleSignUp } from "../../hooks/auth/useHandleSignUp";

export interface SignUpData {
  email: string;
  password: string;
}

interface SignUpFormProps {
  switchToSignIn: () => void;
}

export const SignUpForm = ({ switchToSignIn }: SignUpFormProps) => {
  const {
    loading,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    signUpError,
    handleSubmit,
    onSubmit,
    control,
    errors,
  } = useHandleSignUp();

  const t = useTranslations("navbar");

  return (
    <div className="w-full md:w-[18.5rem] 1xl:w-[20rem] flex flex-col items-center mb-2">
      <h1 className="text-3xl 1xl:text-4xl font-bold mb-12 1xl:mb-16 mt-2 1xl:mt-4 text-primaryText">
        {t("signUp")}
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
                  type="text"
                  placeholder={t("yourEmail")}
                  onInput={() => setShowPasswordError(false)}
                  maxLength={20}
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
              <InputGroup className="h-full">
                <InputGroupInput
                  {...field}
                  type="password"
                  placeholder={t("yourPassword")}
                  onInput={() => setShowEmailError(false)}
                  maxLength={20}
                />
                <InputGroupAddon>
                  <PasswordIcon />
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
        {/* On mobile I used for errors standard red text instead of tooltips to save space */}
        {errors.email && showEmailError && (
          <p className="text-sm text-red-500 -mb-2 md:hidden text-left w-full">
            {errors.email.message}
          </p>
        )}
        {errors.password && showPasswordError && (
          <p className="text-sm text-red-500 -mb-3 md:hidden text-left w-full">
            {errors.password.message}
          </p>
        )}
        {signUpError && (
          <p className="text-sm text-red-500 -mb-3 text-left w-full">
            {signUpError}
          </p>
        )}
        <div className="flex flex-col items-center w-full mt-4 1xl:mt-6">
          <div className="w-4/5 h-[2.5rem]">
            <ContainedButton
              disabled={loading}
              type="submit"
              className="ignore-error-hide"
            >
              {loading ? (
                <div className="pt-[0.3rem]">
                  <SpinnerIcon width={45} height={45} />
                </div>
              ) : (
                t("createAccount")
              )}
            </ContainedButton>
          </div>
          <div className="w-full text-xs 1xl:text-sm flex justify-center gap-2 mt-4 1xl:mt-6">
            <div className="text-primaryText">{t("alreadyHaveAccount")}</div>
            <button
              type="button"
              onClick={switchToSignIn}
              className="text-coloredText text-semibold cursor-pointer hover:text-coloredTextHover ignore-error-hide"
            >
              {t("signInHere")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
