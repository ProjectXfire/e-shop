"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getStockBySlug } from "@/core/shop/services/get-product.service";
import SkeletonAnimated from "@/shared/components/animations/skeleton-animated/SkeletonAnimated";

interface Props {
  productSlug: string;
}

function ProductStock({ productSlug }: Props): React.ReactElement {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getStockBySlug(productSlug)
      .then((value) => {
        setStock(value);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles["product-feature__stock"]}>
      <p>En Stock</p>
      {isLoading ? <SkeletonAnimated /> : <p>{stock}</p>}
    </div>
  );
}
export default ProductStock;
