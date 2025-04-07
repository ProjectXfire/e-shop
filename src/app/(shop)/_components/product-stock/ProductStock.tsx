"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getStockBySlug } from "@/core/shop/services/get-product.service";

interface Props {
  slug: string;
}

function ProductStock({ slug }: Props): React.ReactElement {
  const [inStock, setInStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getStockBySlug(slug)
      .then((value) => {
        setInStock(value);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles["product-stock"]}>
      <p className={styles["product-stock__text"]}>In Stock:</p>
      {isLoading ? <Skeleton /> : <p className={styles["product-stock__value"]}>{inStock}</p>}
    </div>
  );
}
export default ProductStock;

function Skeleton(): React.ReactElement {
  return <div className={styles["product-stock__skeleton"]}></div>;
}
