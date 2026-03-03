"use client";

import { AlertsUI } from "./AlertsUI";
import { AvatarsUI } from "./AvatarsUI";
import { BadgesUI } from "./BadgesUI";
import { BreadcrumbsUI } from "./BreadcrumbsUI";
import { ButtonsUI } from "./ButtonsUI";
import { CommandUI } from "./CommandUI";
import { DialogsUI } from "./DialogsUI";
import { PopoverUI } from "./PopoverUI";
import { ProgressUI } from "./ProgressUI";
import { SeparatorsUI } from "./SeparatorsUI";
import { SkeletonsUI } from "./SkeletonsUI";
import { TabsUI } from "./TabsUI";
import { TooltipsUI } from "./TooltipsUI";

/**
 * Layout container for the UI elements demo page.
 * Displays all UI component variants in a responsive two-column grid.
 *
 * @component
 */
export const UIElementsView = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
      <h1 className="sr-only">UI Elements</h1>
      {/* Left Column */}
      <div className="flex flex-col gap-6">
        <ButtonsUI />
        <AlertsUI />
        <CommandUI />
        <AvatarsUI />
        <TabsUI />
        <SkeletonsUI />
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-6">
        <DialogsUI />
        <BadgesUI />
        <PopoverUI />
        <ProgressUI />
        <TooltipsUI />
        <BreadcrumbsUI />
        <SeparatorsUI />
      </div>
    </div>
  );
};
