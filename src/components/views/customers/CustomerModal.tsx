import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "../../common/shadcn/button";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { CustomerModalProps } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../../common/shadcn/dialog";

export const CustomerModal = ({
  closeModal,
  customerData,
}: CustomerModalProps) => {
  const t = useTranslations("customers.customerModal");
  const [imageLoaded, setImageLoaded] = useState(false);

  const [mockTotalOrders] = useState(() => Math.floor(Math.random() * 10 + 10));
  const [mockReturns] = useState(() => Math.floor(Math.random() * 5 + 1));
  const [mockLoyaltyPoints] = useState(() =>
    Math.floor(Math.random() * 300 + 150),
  );

  const customerDetails = [
    // Some values here are mocked for visual/demo purposes
    { label: t("moneySpent"), value: "$" + customerData.col6 },
    { label: t("totalOrders"), value: mockTotalOrders },
    { label: t("phone"), value: customerData.col5 },
    { label: t("email"), value: "customer@mail.com" },
    { label: t("returns"), value: mockReturns },
    { label: t("loyaltyPoints"), value: mockLoyaltyPoints },
  ];

  return (
    <div className="flex">
      <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:w-[38rem] sm:h-auto md:w-[38rem] border-0 sm:border sm:border-inputBorder sm:rounded-2xl px-6 xsm:px-8 sm:px-12 pt-8 sm:pt-[3rem] overflow-y-auto sm:overflow-y-visible">
          <DialogTitle className="sr-only">
            {customerData.col1} {customerData.col2}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {customerData.col1} {customerData.col2}
          </DialogDescription>
          <div className="flex items-center justify-center w-full flex-col gap-2">
            <div className="flex w-full gap-6">
              <div className="flex min-h-[6rem] min-w-[6rem]">
                {!imageLoaded && <SpinnerIcon className="contentSpinner" />}
                <img
                  src={customerData.col0}
                  alt="User Profile"
                  onLoad={() => setImageLoaded(true)}
                  style={{ display: imageLoaded ? "block" : "none" }}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-start text-left">
                  <h1 className="text-primaryText text-4xl w-full text-left mt-3 mb-2">
                    {customerData.col1} {customerData.col2}
                  </h1>
                </div>
                <div className="flex">
                  <h4 className="text-secondaryText text-md w-full text-left mt-1 mb-2">
                    {customerData.col3}, {customerData.col4}
                  </h4>
                </div>
              </div>
            </div>
            <div className="text-primaryText text-base w-full text-left mt-5 flex flex-wrap justify-between">
              {customerDetails.map((customer) => (
                <div
                  key={customer?.label}
                  className="border-b border-mainBorder w-full xsm:w-[47%] my-[0.6rem] pb-2 flex min-w-0"
                >
                  <div className="text-secondaryText mr-1 flex-shrink-0">
                    {customer?.label}:
                  </div>
                  <div className="truncate">{customer?.value}</div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="mt-8 sm:mt-12 !flex-row gap-3 sm:space-x-0 [&>*]:h-[2.9rem] [&>*]:flex-1 md:[&>*]:flex-initial md:justify-end md:[&>*]:w-[9.5rem] md:gap-3">
            <Button variant="outline">Order history</Button>
            <Button icon={<PhoneIcon />}>Call customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
