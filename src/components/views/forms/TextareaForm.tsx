"use client";

import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";
import { Textarea } from "../../common/shadcn/textarea";

/**
 * Showcase of a multiline textarea input
 * with label and placeholder text.
 *
 * @component
 */
export const TextareaForm = () => {
  const t = useTranslations("forms");

  return (
    <Card
      id="textarea"
      isHeaderDividerVisible
      addTitleMargin
      title={t("textarea")}
    >
      <div className="grid w-full gap-[0.8rem]">
        <Label htmlFor="message">Description</Label>
        <Textarea placeholder="Type your message here." id="message" rows={6} />
      </div>
    </Card>
  );
};
