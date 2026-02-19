"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

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

export const DialogsUI = () => {
  const t = useTranslations("uiElements");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("dialogs")}>
      <div className="flex gap-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:w-[25rem] sm:h-auto sm:max-w-[25rem] !p-8">
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a description of what this dialog does. It provides
                additional context to the user.
              </DialogDescription>
            </DialogHeader>
            <div className="pb-4">
              <p className="text-base text-primaryText">
                This is the main content area of the dialog. You can place any
                content here.
              </p>
            </div>
            <DialogFooter>
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
          <DialogContent className="sm:w-[25rem] sm:h-auto sm:max-w-[25rem] !p-8">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
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
