"use client";

import { useTranslations } from "next-intl";
import * as React from "react";

import { Card } from "../../common/Card";
import { Progress } from "../../common/shadcn/progress";

/**
 * Showcase of progress bar states: in-progress (66%),
 * complete (100%), and empty (0%).
 *
 * @component
 */
export const ProgressUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card
      id="progress"
      isHeaderDividerVisible
      addTitleMargin
      title={t("progress")}
    >
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Loading...</span>
            <span>66%</span>
          </div>
          <Progress value={66} />
        </div>
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Complete</span>
            <span>100%</span>
          </div>
          <Progress value={100} />
        </div>
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Starting</span>
            <span>0%</span>
          </div>
          <Progress value={0} />
        </div>
      </div>
    </Card>
  );
};
