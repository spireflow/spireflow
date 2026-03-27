"use client";

import { UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../common/shadcn/card";
import { Label } from "../../common/shadcn/label";

/**
 * Showcase of a drag-and-drop file upload zone
 * with keyboard-accessible label trigger.
 *
 * @component
 */
export const FileUploadForm = () => {
  const t = useTranslations("forms");

  return (
    <Card id="fileUpload">
      <CardHeader variant="divider">
        <CardTitle>{t("fileUpload")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mb-4 block">Dropzone</Label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("dropzone-file")?.click();
                }
              }}
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-inputBorder border-dashed rounded-lg cursor-pointer bg-dropzoneBg hover:bg-dropzoneBgHover"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-4 text-secondaryText" />
                <p className="mb-2 text-sm text-secondaryText">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-secondaryText">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
