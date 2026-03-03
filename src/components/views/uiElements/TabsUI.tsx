"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Badge } from "../../common/shadcn/badge";
import { Button } from "../../common/shadcn/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../common/shadcn/tabs";

export const TabsUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("tabs")}>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4 mt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Account Information</h3>
            <p className="text-sm text-secondaryText leading-relaxed">
              Manage your account settings and preferences here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-sm">Account is verified</span>
          </div>
        </TabsContent>
        <TabsContent value="password" className="space-y-4 mt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Password Settings</h3>
            <p className="text-sm text-secondaryText leading-relaxed">
              Change your password and security settings.
            </p>
          </div>
          <Button variant="outline">Change Password</Button>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4 mt-6">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">General Settings</h3>
            <p className="text-sm text-secondaryText leading-relaxed">
              Configure general application settings.
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <Badge>Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark mode</span>
              <Badge variant="secondary">Auto</Badge>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
