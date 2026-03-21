"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

import { MailIcon } from "../../assets/icons/MailIcon";
import { Link } from "../../i18n/navigation";
import { Button } from "../common/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../common/shadcn/input-group";

interface ForgotPasswordData {
  email: string;
}

const SUBMIT_COOLDOWN_MS = 2000;

export const ForgotPasswordForm = () => {
  const t = useTranslations("auth");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const isSubmittingRef = useRef(false);
  const lastSubmitTimeRef = useRef(0);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .required(t("emailFieldIsRequired"))
          .email(t("pleaseEnterAValidEmail")),
      }),
    [t],
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: { email: "" },
  });

  /** Show error tooltip when validation fails */
  useEffect(() => {
    if (errors.email) {
      setShowEmailError(true);
    }
  }, [errors.email]);

  /** Hide error messages when user clicks anywhere on the screen */
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".ignore-error-hide")) return;
      setShowEmailError(false);
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const onSubmit = useCallback(async (_data: ForgotPasswordData) => {
    const now = Date.now();

    if (isSubmittingRef.current) return;
    if (now - lastSubmitTimeRef.current < SUBMIT_COOLDOWN_MS) return;

    isSubmittingRef.current = true;
    lastSubmitTimeRef.current = now;

    try {
      setLoading(true);
      /** UI-only: simulate a short delay, then show success state */
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitted(true);
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }, []);

  if (isSubmitted) {
    return (
      <div className="w-full sm:max-w-84 md:w-78 1xl:w-84 flex flex-col items-center">
        <div className="w-16 h-16 1xl:w-20 1xl:h-20 mb-6 1xl:mb-8 mt-2 1xl:mt-4 stroke-mainColor [&>svg]:w-full [&>svg]:h-full">
          <MailIcon />
        </div>
        <h1 className="text-2xl sm:text-xl 1xl:text-2xl font-bold mb-3 text-primaryText text-center">
          {t("checkYourEmail")}
        </h1>
        <p className="text-sm text-secondaryText text-center mb-2">
          {t("checkYourEmailDesc")}
        </p>
        <p className="text-xs text-tertiaryText text-center mb-8 1xl:mb-10">
          {t("checkSpamFolder")}
        </p>
        <div className="text-xs 1xl:text-sm flex gap-1">
          <span className="text-primaryText">{t("backToSignInPrefix")}</span>
          <Link
            href="/login"
            className="text-coloredText cursor-pointer hover:text-coloredTextHover"
          >
            {t("backToSignInLink")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sm:max-w-84 md:w-78 1xl:w-84 flex flex-col items-center">
      <h1 className="text-3xl sm:text-2xl 1xl:text-3xl font-bold mb-4 1xl:mb-5 mt-2 sm:mt-6 1xl:mt-8 text-primaryText text-center whitespace-nowrap">
        {t("forgotPasswordTitle")}
      </h1>
      <p className="text-sm text-secondaryText text-center mb-12 1xl:mb-12">
        {t("forgotPasswordSubtitle")}
      </p>
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
                  autoComplete="email"
                  type="text"
                  placeholder={t("yourEmail")}
                  aria-label={t("yourEmail")}
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "forgot-email-error" : undefined
                  }
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
              id="forgot-email-error"
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
        {errors.email && showEmailError && (
          <p
            role="alert"
            className="text-sm text-red-500 -mt-1 md:hidden text-left w-full"
          >
            {errors.email.message}
          </p>
        )}
        <div className="flex flex-col items-center w-full mt-2 1xl:mt-3">
          <div className="w-full h-10">
            <Button
              loading={loading}
              type="submit"
              className="w-full h-full ignore-error-hide"
            >
              {t("sendResetLink")}
            </Button>
          </div>
          <div className="w-full text-xs 1xl:text-sm flex justify-center gap-1 mt-6 1xl:mt-8">
            <span className="text-primaryText">{t("backToSignInPrefix")}</span>
            <Link
              href="/login"
              className="text-coloredText cursor-pointer hover:text-coloredTextHover ignore-error-hide"
            >
              {t("backToSignInLink")}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
