"use client";

import type { CartDto } from "@/core/shop/dtos/cart.dto";
import type { Product, ValidSize } from "@/core/shop/models/product.model";
import { useState } from "react";
import { useCart } from "@/core/shop/store/useCart";
import { currencyFormat } from "@/shared/utils/currency-format";
import styles from "./styles.module.css";
import SelectSizesAnimated from "@/app/(shop)/_components/select-sizes-animated/SelectSizesAnimated";
import CounterAnimated from "@/shared/components/animations/counter-animated/CounterAnimated";
import ButtonAnimated from "@/shared/components/animations/button-animated/ButtonAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

interface Props {
  product: Product;
}

type Features = {
  size: ValidSize;
  quantity: number;
};

function ProductFeatures({ product }: Props): React.ReactElement {
  const addItem = useCart((s) => s.addItem);

  const [featuresSelected, setFeaturesSelected] = useState<Features>({
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

  const handleAddToCart = (): void => {
    const { id, title, description, gender, price, images, slug } = product;
    const { quantity, size } = featuresSelected;
    const cartItem: CartDto = {
      id: `${id}-${size}`,
      title,
      description,
      gender,
      images,
      price,
      quantity,
      size,
      slug,
    };
    toastMessage.success(`${quantity} ${title} agregado(s) al carrito`);
    addItem(cartItem);
  };

  return (
    <section className={styles["product-feature"]}>
      <TitleAnimated title={product.title} subtitle={`${currencyFormat(product.price)}`} />
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
    </section>
  );
}

export default ProductFeatures;
