"use client";

import { Loader2, MessageSquare, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Button } from "../../common/shadcn/button";

/**
 * Showcase of button variants (default, secondary, destructive, etc.),
 * sizes, and icon combinations.
 *
 * @component
 */
export const ButtonsUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card
      id="buttons"
      isHeaderDividerVisible
      addTitleMargin
      title={t("buttons")}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium">Button Variants</span>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium">Button Sizes</span>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium">Buttons with Icons</span>
          <div className="flex flex-wrap gap-3">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              With Icon
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
