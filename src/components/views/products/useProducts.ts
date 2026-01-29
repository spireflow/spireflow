import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { useModal } from "../../../hooks/useModal";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { useTooltip } from "../../../hooks/useTooltip";
import { Product, ProductCategory } from "./types";

export const useProducts = (products: Product[]) => {
  const [activeProduct, setActiveProduct] = useState<Product>({
    productId: "",
    name: "",
    price: 0,
    type: "",
    image: "",
    parameters: [],
    metrics: [],
  });
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const { isOpen, toggle, ref } = useModal();
  const t = useTranslations("products");
  const backendTranslations = useBackendTranslations("products");
  const translatedData = useTranslateData(products, backendTranslations);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const { isTooltipVisible, showTooltip } = useTooltip();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showTooltip();
    } catch (err: unknown) {
      console.error("Failed to copy:", err);
    }
  };

  const categorizeProducts = (products: Product[]): ProductCategory[] => {
    const categories: { [key: string]: Product[] } = {};
    products.forEach((product) => {
      categories[product.type] = categories[product.type] || [];
      categories[product.type].push(product);
    });
    return Object.keys(categories).map((name) => ({
      name,
      sales: categories[name],
    }));
  };

  useEffect(() => {
    if (products.length > 0) {
      setActiveProduct(translatedData[0]);
      setProductCategories(categorizeProducts(translatedData));
    }
  }, [products]);

  const handleProductClick = (product: Product) => {
    if (activeProduct.image !== product.image) {
      setImageLoaded(false);
    } else {
      setImageLoaded(true);
    }
    setActiveProduct(product);
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1024) {
        toggle();
      }
    }
  };

  const handleShowAllProductsClick = () => {
    toggle();
  };

  return {
    activeProduct,
    productCategories,
    isOpen,
    toggle,
    ref,
    t,
    isPhotoOpen,
    setIsPhotoOpen,
    isTooltipVisible,
    showTooltip,
    handleCopyToClipboard,
    handleProductClick,
    handleShowAllProductsClick,
    imageLoaded,
    setImageLoaded,
  };
};
