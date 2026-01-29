"use client";

import { UploadCloud } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { Label } from "../../common/shadcn/label";

export const FileUploadForm = () => {
  const t = useTranslations("forms");

  return (
    <Card isHeaderDividerVisible addTitleMargin title={t("fileUpload")}>
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
    </Card>
  );
};
