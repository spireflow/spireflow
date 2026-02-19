"use client";

import * as React from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Input } from "../../common/shadcn/input";
import { Label } from "../../common/shadcn/label";
import { Button } from "../../common/shadcn/button";

export const InputFieldsForm = () => {
  const t = useTranslations("forms");
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("inputFields")}>
      <div className="flex flex-col gap-6">
        <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
          <Label htmlFor="email">Default Input</Label>
          <Input type="text" id="email" placeholder="Default Input" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
          <Label htmlFor="active">Active Input</Label>
          <Input
            type="text"
            id="active"
            placeholder="Active Input"
            className="border-focusVisibleBorder hover:border-focusVisibleBorder focus:!border-focusVisibleBorder"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
          <Label htmlFor="password">Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-secondaryText" />
              ) : (
                <Eye className="h-4 w-4 text-secondaryText" />
              )}
            </Button>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
          <Label htmlFor="error">Error Input</Label>
          <Input
            type="text"
            id="error"
            placeholder="Error Input"
            className="border-red-500 hover:border-red-500 focus:!border-red-500"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
          <Label htmlFor="disabled">Disabled Input</Label>
          <Input
            disabled
            type="text"
            id="disabled"
            placeholder="Disabled Input"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-[0.8rem]">
          <Label htmlFor="email-icon">Input with Icon</Label>
          <div className="relative">
            <Mail className="absolute left-2.5 top-[0.725rem] h-4 w-4 text-secondaryText" />
            <Input type="email" placeholder="Email" className="pl-8" />
          </div>
        </div>
      </div>
    </Card>
  );
};
