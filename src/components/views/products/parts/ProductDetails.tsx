import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";
import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import { CameraIcon } from "@/assets/icons/CameraIcon";
import { CopyIcon } from "@/assets/icons/CopyIcon";
import { SpinnerIcon } from "@/assets/icons/SpinnerIcon";
import { Button } from "@/components/common/shadcn/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/common/shadcn/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/common/shadcn/tooltip";

import { ProductDetailsProps } from "../types";
import { ProductParameter } from "./ProductParameter";
import { ProductPDF } from "./ProductPDF";
import { ProgressCircles } from "./ProgressCircles";

export const ProductDetails = ({
  activeProduct,
  isPhotoOpen,
  setIsPhotoOpen,
  imageLoaded,
  setImageLoaded,
  handleCopyToClipboard,
  handleShowAllProductsClick,
  isTooltipVisible,
}: ProductDetailsProps) => {
  const t = useTranslations("products");

  const thumbnailsRef = useRef<ThumbnailsRef>(null);
  const pdfModuleRef = useRef<typeof import("@react-pdf/renderer") | null>(
    null,
  );
  const profit = activeProduct.price * 0.12;

  /** Lazy-loads @react-pdf/renderer on mount to keep it out of the main bundle. */
  useEffect(() => {
    import("@react-pdf/renderer").then((mod) => {
      pdfModuleRef.current = mod;
    });
  }, []);

  const downloadViaLink = useCallback((blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const handleExportPDF = async () => {
    try {
      const mod = pdfModuleRef.current ?? (await import("@react-pdf/renderer"));
      const blob = await mod
        .pdf(<ProductPDF product={activeProduct} />)
        .toBlob();
      const fileName = `${activeProduct.name}.pdf`;
      const file = new File([blob], fileName, { type: "application/pdf" });

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: fileName });
        } catch (shareError) {
          if (shareError instanceof Error && shareError.name === "AbortError") {
            return;
          }
          downloadViaLink(blob, fileName);
        }
      } else {
        downloadViaLink(blob, fileName);
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <div className="w-full lg:w-3/4 ">
      <div className="flex flex-col">
        <div className="flex gap-6 md:gap-8 items-center justify-start mb-16">
          <div
            role="button"
            tabIndex={0}
            aria-label={`${t("header.viewPhoto")} ${activeProduct.name}`}
            onClick={() => setIsPhotoOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsPhotoOpen(true);
              }
            }}
            className="group relative min-w-36 hover:bg-[rgb(255,255,255,0.02)] cursor-pointer min-h-36 w-36 h-36 xsm:min-h-40 xsm:min-w-40 sm:h-42 sm:w-42 1xl:h-50 1xl:w-50 3xl:h-60 3xl:w-60 p-0 rounded-xl flex justify-center items-center border border-mainBorder"
          >
            <div className="rounded-xl relative w-full h-full bg-[rgb(0,0,0,0.01)] flex justify-center items-center">
              {!imageLoaded && (
                <div className="w-full h-full flex items-center justify-center pl-2">
                  <SpinnerIcon
                    height={120}
                    width={120}
                    className="contentSpinner"
                  />
                </div>
              )}
              {activeProduct.image && (
                <img
                  src={activeProduct.image}
                  alt="Product"
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    maxHeight: "100%",
                    display: imageLoaded ? "block" : "none",
                  }}
                />
              )}
            </div>
            {imageLoaded && (
              <div className="absolute top-0 left-0 w-full h-full hidden xl:flex justify-center items-center z-20 opacity-0 group-hover:opacity-100">
                <div className="w-10 h-10 text-[rgb(255,255,255,0.7)]">
                  <CameraIcon />
                </div>
              </div>
            )}
          </div>
          <Lightbox
            plugins={[Thumbnails, Fullscreen, Zoom, Counter]}
            thumbnails={{ ref: thumbnailsRef }}
            noScroll={{ disabled: true }}
            open={isPhotoOpen}
            close={() => setIsPhotoOpen(false)}
            slides={[
              {
                src:
                  activeProduct.type === "Phone" ||
                  activeProduct.type === "Telefon"
                    ? "/phone.png"
                    : activeProduct.type === "Tablet"
                      ? "/tablet.png"
                      : "/laptop.png",
              },
              {
                src:
                  activeProduct.type === "Phone" ||
                  activeProduct.type === "Telefon"
                    ? "/tablet.png"
                    : activeProduct.type === "Tablet"
                      ? "/laptop.png"
                      : "/phone.png",
              },
              {
                src:
                  activeProduct.type === "Phone" ||
                  activeProduct.type === "Telefon"
                    ? "/laptop.png"
                    : activeProduct.type === "Tablet"
                      ? "/phone.png"
                      : "/tablet.png",
              },
            ]}
            counter={{ container: { style: { top: "unset", bottom: 0 } } }}
            on={{
              click: () => {
                (thumbnailsRef.current?.visible
                  ? thumbnailsRef.current?.hide
                  : thumbnailsRef.current?.show)?.();
              },
            }}
          />
          <div>
            <h2 className="text-lg md:text-2xl 1xl:text-3xl 3xl:text-4xl mb-3 xsm:mb-4 text-primaryText">
              {activeProduct.name}
            </h2>
            <div className="flex gap-1">
              <p className="text-sm md:text-base text-secondaryText">
                {t("header.type")}:
              </p>
              <p className="text-sm md:text-base text-primaryText">
                {activeProduct.type}
              </p>
            </div>
            <div className="flex text-sm md:text-base 3xl:text-xl gap-2 xsm:gap-4 md:gap-8 mt-2 xsm:mt-3 2xl:mt-4 flex-col xsm:flex-row">
              <div className="flex gap-2">
                <p className="text-secondaryText">{t("header.price")}:</p>
                <p className="text-primaryText">
                  ${activeProduct.price.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-secondaryText">{t("header.markup")}:</p>
                <p className="text-primaryText">12%</p>
                <p className="flex md:hidden text-primaryText">
                  (${profit.toFixed(0)})
                </p>
              </div>
              <div className="hidden md:flex gap-2">
                <p className="text-secondaryText">{t("header.profit")}:</p>
                <p className="text-primaryText">${profit.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {activeProduct.parameters.map((param, index) => (
            <div
              key={index}
              className={`text-primaryText text-primaryText ${
                index <= 8 && "border-b border-mainBorder border-mainBorder"
              }`}
            >
              <ProductParameter title={param.title} value={param.value} />
            </div>
          ))}
        </div>
      </div>
      <ProgressCircles metrics={activeProduct.metrics} />
      <div className="flex justify-center sm:justify-between items-center w-full mt-8 xsm:mt-14">
        <div className="flex items-center gap-2">
          <Tooltip open={isTooltipVisible}>
            <TooltipTrigger asChild>
              <div className="flex justify-center items-center max-w-56">
                <div className="w-10 text-xl text-secondaryText">ID:</div>
                <InputGroup>
                  <InputGroupInput
                    value={activeProduct.productId}
                    type="text"
                    readOnly
                    aria-label="Product ID"
                  />
                  <InputGroupAddon align="inline-end" className="pr-1">
                    <InputGroupButton
                      size="icon-xs"
                      variant="ghost"
                      onClick={() =>
                        handleCopyToClipboard(activeProduct.productId)
                      }
                      aria-label="Copy product ID"
                    >
                      <CopyIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={7}
              alignOffset={3}
              className="hidden sm:flex"
            >
              {t("clipboard.copiedToClipboard")}
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="hidden sm:flex w-60 h-12 items-center justify-end">
          <Button
            variant="outline"
            className="w-40 h-full"
            onClick={handleExportPDF}
          >
            {t("pdf.exportToPdf")}
          </Button>
        </div>
      </div>
      <div className="flex lg:hidden w-[100%] text-sm sm:text-md xsm:w-[90%] h-12 mx-auto mt-8 xsm:mt-14 items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={handleShowAllProductsClick}
          className="w-[80%] sm:w-1/2 h-full"
        >
          {t("mobileList.showAllProducts")}
        </Button>
      </div>
    </div>
  );
};
