import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { OutlinedButton } from "../../common/OutlinedButton";
import { Input } from "../../forms/Input";
import { CopyIcon } from "../../../assets/icons/CopyIcon";
import { ProgressCircles } from "./ProgressCircles";
import { Tooltip } from "../../common/Tooltip";
import { CameraIcon } from "../../../assets/icons/CameraIcon";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { ProductParameter } from "./ProductParameter";
import { ProductPDF } from "./ProductPDF";
import { ProductDetailsProps } from "./types";

const DynamicPDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

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
  const profit = activeProduct.price * 0.12;

  const pdfDocument = useMemo(
    () => <ProductPDF product={activeProduct} />,
    [activeProduct]
  );

  return (
    <div className="w-full lg:w-3/4 ">
      <div className="flex flex-col">
        <div className="flex gap-6 md:gap-8 items-center justify-start mb-16">
          <div
            onClick={() => setIsPhotoOpen(true)}
            className="group relative min-w-[9rem] hover:bg-[rgb(255,255,255,0.02)] cursor-pointer min-h-[9rem] w-[9rem] h-[9rem] xsm:min-h-[10rem] xsm:min-w-[10rem] sm:h-[10.5rem] sm:w-[10.5rem] 1xl:h-[12.5rem] 1xl:w-[12.5rem] 3xl:h-[15rem] 3xl:w-[15rem] p-0 rounded-xl flex justify-center items-center border border-mainBorder"
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
          <div className="flex justify-center items-center relative max-w-[15.5rem]">
            <div className="w-10 text-xl text-secondaryText">ID:</div>
            <Input value={activeProduct.productId} type="text"></Input>
            <button
              className="absolute right-2 text-grayIcon hover:text-grayIconHover"
              onClick={() => handleCopyToClipboard(activeProduct.productId)}
            >
              <CopyIcon />
            </button>
          </div>
          {isTooltipVisible && (
            <div className="hidden sm:flex bottom-1">
              <Tooltip text={t("clipboard.copiedToClipboard")} />
            </div>
          )}
        </div>
        <div className="hidden sm:flex w-[15rem] h-12 items-center justify-end">
          <DynamicPDFDownloadLink
            document={pdfDocument}
            fileName={`${activeProduct.name}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                "Loading document..."
              ) : (
                <OutlinedButton
                  text={t("pdf.exportToPdf")}
                  className="min-w-[10rem]"
                />
              )
            }
          </DynamicPDFDownloadLink>
        </div>
      </div>
      <div className="flex lg:hidden w-[100%] text-sm sm:text-md xsm:w-[90%] h-12 mx-auto mt-8 xsm:mt-14 items-center justify-center gap-4">
        <div className="w-1/2">
          <OutlinedButton
            text={t("mobileList.showAllProducts")}
            handleClick={handleShowAllProductsClick}
          />
        </div>
        <div className="flex sm:hidden w-1/2">
          <DynamicPDFDownloadLink
            document={pdfDocument}
            fileName={`${activeProduct.name}.pdf`}
            style={{ width: "100%" }}
          >
            {({ loading }) =>
              loading ? (
                "Loading document..."
              ) : (
                <OutlinedButton
                  text={t("pdf.exportToPdf")}
                  className="w-full"
                />
              )
            }
          </DynamicPDFDownloadLink>
        </div>
      </div>
    </div>
  );
};
