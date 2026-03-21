"use client";

import { Mail, Settings, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../common/shadcn/command";

/**
 * Showcase of a command palette with search input
 * and grouped suggestion items.
 *
 * @component
 */
export const CommandUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card
      id="command"
      isHeaderDividerVisible
      addTitleMargin
      title={t("command")}
    >
      <Command
        className="rounded-lg border border-inputBorder"
        value=""
        defaultValue=""
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </CommandItem>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Card>
  );
};
