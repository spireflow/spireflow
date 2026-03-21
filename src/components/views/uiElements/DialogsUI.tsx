"use client";

import { useTranslations } from "next-intl";
import * as React from "react";

import { Card } from "../../common/Card";
import { Button } from "../../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../common/shadcn/dialog";

/**
 * Showcase of dialog variants: a standard confirmation dialog
 * and a destructive delete confirmation dialog.
 *
 * @component
 */
export const DialogsUI = () => {
  const t = useTranslations("uiElements");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  return (
    <Card
      id="dialogs"
      isHeaderDividerVisible
      addTitleMargin
      title={t("dialogs")}
    >
      <div className="flex gap-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col sm:w-100 sm:h-auto md:w-100 sm:max-w-100 border-0 sm:border sm:border-inputBorder sm:rounded-2xl sm:p-8">
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a description of what this dialog does. It provides
                additional context to the user.
              </DialogDescription>
            </DialogHeader>
            <div className="pb-4">
              <p className="text-base text-primaryText text-center sm:text-left">
                This is the main content area of the dialog. You can place any
                content here.
              </p>
            </div>
            <DialogFooter className="!flex-row gap-4 sm:gap-0 justify-center">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Dialog</Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col sm:w-100 sm:h-auto md:w-100 sm:max-w-100 border-0 sm:border sm:border-inputBorder sm:rounded-2xl sm:p-8">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="!flex-row gap-4 sm:gap-0 justify-center">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};
