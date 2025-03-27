"use client";

import type { Product, ValidSize } from "@/core/shop/models/product";
import { useState } from "react";
import styles from "./styles.module.css";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import SelectSizesAnimated from "@/app/(shop)/_components/select-sizes-animated/SelectSizesAnimated";
import CounterAnimated from "@/shared/components/animations/counter-animated/CounterAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";

interface Props {
  product: Product;
}

type Features = {
  color: string;
  size: ValidSize;
  quantity: number;
};

function ProductFeatures({ product }: Props): React.ReactElement {
  const [, setFeaturesSelected] = useState<Features>({
    color: "",
    size: product.sizes[0],
    quantity: 1,
  });

  const sizes = product.sizes.map((size) => ({
    label: size,
    value: size,
  }));

  const handleSelectSize = (value: ValidSize): void => {
    setFeaturesSelected((cv) => ({ ...cv, size: value }));
  };

  const handleQuantity = (value: number): void => {
    setFeaturesSelected((cv) => ({ ...cv, quantity: value }));
  };

  const handleAddToCart = (): void => {};

  return (
    <>
      <div className={styles["product-feature__sizes"]}>
        <p className={styles["product-subtitle"]}>Tamaño</p>
        <SelectSizesAnimated
          values={sizes}
          onSelecValue={handleSelectSize}
          defaultValue={product.sizes[0]}
        />
      </div>
      <div className={styles["product-feature__qtty"]}>
        <p className={styles["product-subtitle"]}>Cantidad</p>
        <CounterAnimated defaultValue={1} onChangeCounter={handleQuantity} />
      </div>
      <div className={styles["product-feature__description"]}>
        <p className={styles["product-subtitle"]}>Descripción</p>
        <p>{product.description}</p>
      </div>
      <ButtonAnimated subBlockColor="var(--color-purple-4)" onClick={handleAddToCart}>
        Añadir al carrito
      </ButtonAnimated>
    </>
  );
}
export default ProductFeatures;
