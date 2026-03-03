import { useTranslations } from "next-intl";

import { OrderModalIcon } from "../../../assets/icons/OrderModalIcon";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { Button } from "../../common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../../common/shadcn/dialog";
import { OrderModalProps } from "./types";

export const OrderModal = ({ closeModal, orderData }: OrderModalProps) => {
  const t = useTranslations("orders.orderModal");

  const orderDetails = [
    { label: t("id"), value: orderData.col1 },
    { label: t("product"), value: orderData.col2 },
    { label: t("customer"), value: orderData.col3 },
    { label: t("price"), value: `$${orderData.col4.toFixed(2)}` },
    {
      label: t("shipping"),
      value: orderData.col5.split(" ").slice(0, -1).join(" "),
    },
    { label: t("date"), value: orderData.col6 },
    { label: t("status"), value: orderData.col7 },
    // One mocked value to display even number of details, visual purposes only
    { label: t("priority"), value: t("normal") },
  ];

  return (
    <div className="flex">
      <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:w-128 sm:h-auto md:w-128 border-0 sm:border sm:border-inputBorder sm:rounded-2xl px-6 xsm:px-8 sm:px-12 pt-8 sm:pt-12 overflow-y-auto sm:overflow-y-visible">
          <DialogTitle className="sr-only">{t("title")}</DialogTitle>
          <DialogDescription className="sr-only">
            {t("title")}
          </DialogDescription>
          <div className="flex items-center justify-center w-full flex-col gap-2">
            <div className="rounded-full border border-mainBorder p-4 w-18 flex justify-center items-center mr-0 text-secondaryText -mt-1">
              <OrderModalIcon width={30} height={30} />
            </div>
            <h2 className="text-primaryText text-3xl w-full text-center mt-3 mb-2">
              {t("title")}
            </h2>
            <div className="text-primaryText text-base w-full text-left mt-4 flex flex-wrap justify-between">
              {orderDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="border-b border-mainBorder w-full xsm:w-[47%] my-2 pb-2 flex"
                >
                  <div className="text-secondaryText mr-1">{detail.label}:</div>
                  {detail.value}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="mt-8 sm:mt-12 !flex-row gap-3 sm:space-x-0 [&>*]:flex-1 [&>*]:h-[2.9rem]">
            <Button variant="outline">Cancel order</Button>
            <Button icon={<PhoneIcon />}>Call logistics</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
