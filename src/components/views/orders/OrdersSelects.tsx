import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../common/shadcn/select";
import { OrdersSelectsProps, OrderType } from "./types";

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
        new Set(ordersData.map((item) => (item as OrderType).productName)),
      ),
    },
    {
      value: filters.user,
      setFilterKey: "user",
      placeholder: t("selectPlaceholder.allUsers"),
      options: Array.from(
        new Set(ordersData.map((item) => (item as OrderType).user)),
      ),
    },
    {
      value:
        filters.priceRange.min === 0 && filters.priceRange.max === 5000
          ? "" /** Treat the initial state as equivalent to having no selection. */
          : typeof filters.priceRange.min === "undefined" ||
              typeof filters.priceRange.max === "undefined"
            ? ""
            : `${filters.priceRange.min}-${filters.priceRange.max}`,
      setFilterKey: "priceRange",
      placeholder: t("selectPlaceholder.anyPrice"),
      options: ["0-100", "100-500", "500-1000", "1000-5000"],
      specialHandler: (value: string) => {
        if (value === "") {
          setFilter("priceRange", { min: 0, max: 5000 });
        } else {
          const [min, max] = value.split("-").map(Number);
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

  const PLACEHOLDER_VALUE = "__placeholder__";

  return (
    <div className="flex flex-col md:flex-row w-full md:gap-4">
      {selectsConfig.map(
        (
          { value, setFilterKey, placeholder, options, specialHandler },
          index,
        ) => (
          <div key={index} className="w-full md:w-1/3 mb-4">
            <Select
              value={value || PLACEHOLDER_VALUE}
              onValueChange={(newValue) => {
                if (newValue === PLACEHOLDER_VALUE) {
                  if (specialHandler) {
                    specialHandler("");
                  } else {
                    setFilter(setFilterKey as keyof typeof filters, "");
                  }
                } else {
                  if (specialHandler) {
                    specialHandler(newValue);
                  } else {
                    setFilter(setFilterKey as keyof typeof filters, newValue);
                  }
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={PLACEHOLDER_VALUE}>{placeholder}</SelectItem>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ),
      )}
    </div>
  );
};
