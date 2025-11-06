import React, { ChangeEvent } from "react";
import { useTranslations } from "next-intl";

import { OrderType, OrdersSelectsProps } from "./types";
import { Select } from "../../forms/Select";

export const OrderSelects = ({
  filters,
  setFilter,
  ordersData,
}: OrdersSelectsProps) => {
  const t = useTranslations("orders");

  const deliveryTypeOptions = [
    "Standard shipping",
    "Two-day shipping",
    "Free shipping",
    "Express shipping",
  ];

  const statusOptions = ["Delivered", "In Transit", "Shipped"];

  const selectsConfig = [
    {
      value: filters.productName,
      setFilterKey: "productName",
      placeholder: t("selectPlaceholder.allProducts"),
      options: Array.from(
        new Set(ordersData.map((item) => (item as OrderType).productName))
      ),
    },
    {
      value: filters.user,
      setFilterKey: "user",
      placeholder: t("selectPlaceholder.allUsers"),
      options: Array.from(
        new Set(ordersData.map((item) => (item as OrderType).user))
      ),
    },
    {
      value:
        filters.priceRange.min === 0 && filters.priceRange.max === 5000
          ? "" // Treat the initial state as equivalent to having no selection.
          : typeof filters.priceRange.min === "undefined" ||
              typeof filters.priceRange.max === "undefined"
            ? ""
            : `${filters.priceRange.min}-${filters.priceRange.max}`,
      setFilterKey: "priceRange",
      placeholder: t("selectPlaceholder.anyPrice"),
      options: ["0-100", "100-500", "500-1000", "1000-5000"],
      specialHandler: (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "") {
          setFilter("priceRange", { min: 0, max: 5000 });
        } else {
          const [min, max] = e.target.value.split("-").map(Number);
          setFilter("priceRange", { min, max });
        }
      },
    },
    {
      value: filters.deliveryType,
      setFilterKey: "deliveryType",
      placeholder: t("selectPlaceholder.anyDeliveryType"),
      options: deliveryTypeOptions,
    },
    {
      value: filters.status,
      setFilterKey: "status",
      placeholder: t("selectPlaceholder.anyStatus"),
      options: statusOptions,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full md:gap-4">
      {selectsConfig.map(
        (
          { value, setFilterKey, placeholder, options, specialHandler },
          index
        ) => (
          <div key={index} className="w-full md:w-1/3 mb-4">
            <Select
              value={value}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                if (specialHandler) {
                  specialHandler(e);
                } else {
                  setFilter(
                    setFilterKey as keyof typeof filters,
                    e.target.value
                  );
                }
              }}
              placeholder={placeholder}
              customOptions={options}
              customOnDesktop
              isBottomPlaceholderVisible
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        )
      )}
    </div>
  );
};
