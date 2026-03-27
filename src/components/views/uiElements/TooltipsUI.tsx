"use client";

import { Bell, HelpCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "../../common/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../common/shadcn/tooltip";

/**
 * Showcase of tooltips on buttons and icon buttons
 * with different placement sides (top, bottom, left).
 *
 * @component
 */
export const TooltipsUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card id="tooltips">
      <CardHeader variant="divider">
        <CardTitle>{t("tooltips")}</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider delayDuration={100}>
          <div className="flex gap-4 flex-wrap">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Email</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Help Center</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
