"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Card } from "../../common/Card";
import { Button } from "../../common/shadcn/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../common/shadcn/form";
import { Input } from "../../common/shadcn/input";

// Form Schema for Validation Example using Yup
const formSchema = yup.object({
  username: yup
    .string()
    .min(2, "Username must be at least 2 characters.")
    .required("Username is required"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required"),
});

export const FormValidationForm = () => {
  const t = useTranslations("forms");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("formValidation")}>
      <div className="text-sm text-secondaryText mb-6">
        Using react-hook-form and yup for validation.
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primaryText">Username</FormLabel>
                <FormControl>
                  <Input
                    className="mt-[0.3rem]"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primaryText">Email</FormLabel>
                <FormControl>
                  <Input
                    className="mt-[0.3rem]"
                    placeholder="m@example.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {Object.keys(form.formState.errors).length > 0 && (
            <p className="text-sm text-errorBg">
              Please fill in all required fields.
            </p>
          )}
          <Button className="mt-4" type="submit">
            Submit
          </Button>
          {isSubmitted && (
            <p className="flex items-center gap-2 text-sm text-greenBadgeText mt-3">
              <Check className="h-4 w-4" />
              Form submitted
            </p>
          )}
        </form>
      </Form>
    </Card>
  );
};
