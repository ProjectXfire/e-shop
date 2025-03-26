"use client";

import type { Product } from "@/core/shop/models/product";
import NextImage from "next/image";
import NextLink from "next/link";
import styles from "./styles.module.css";
import { useState } from "react";

interface Props {
  product: Product;
}

function ProductItem({ product }: Props): React.ReactElement {
  const [displayImage, setDisplayImage] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1];

  const onHover = (): void => {
    setDisplayImage(true);
  };
  const onLeave = (): void => {
    setDisplayImage(false);
  };

  return (
    <NextLink
      className={styles["product-item"]}
      href={`/products/${product.slug}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <NextImage
        className={`${styles["product-item__image"]} ${
          displayImage && styles["product-item__image--animate"]
        }`}
        src={primaryImage}
        alt={product.title}
        width={500}
        height={500}
      />
      <NextImage
        className={styles["product-item__secondary-image"]}
        src={secondaryImage}
        alt={product.title}
        width={500}
        height={500}
      />
      <p className={styles["product-item__title"]}>{product.title}</p>
      <div className={styles["product-item__spacer"]} />
      <p className={styles["product-item__price"]}>${product.price}</p>
    </NextLink>
  );
}
export default ProductItem;
