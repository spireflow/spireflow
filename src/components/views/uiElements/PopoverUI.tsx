"use client";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Avatar, AvatarFallback } from "../../common/shadcn/avatar";
import { Button } from "../../common/shadcn/button";
import { Input } from "../../common/shadcn/input";
import { Label } from "../../common/shadcn/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../common/shadcn/popover";

export const PopoverUI = () => {
  const t = useTranslations("uiElements");

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("popover")}>
      <div className="flex gap-4 flex-wrap">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-secondaryText">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width" className="text-sm">
                    Width
                  </Label>
                  <Input
                    id="width"
                    className="col-span-2"
                    defaultValue="100%"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height" className="text-sm">
                    Height
                  </Label>
                  <Input
                    id="height"
                    className="col-span-2"
                    defaultValue="25px"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              User Profile
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-primaryText">John Doe</h4>
                  <p className="text-sm text-secondaryText">
                    john.doe@example.com
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Message
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};
