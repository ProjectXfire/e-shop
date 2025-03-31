"use client";

import { useCart } from "@/core/shop/store/useCart";
import CartContainer from "../cart-container/CartContainer";
import CartList from "../cart-list/CartList";
import CartSummary from "../cart-summary/CartSummary";
import EmptyCart from "../empty-cart/EmptyCart";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import { useEffect, useState } from "react";

function Cart() {
  const items = useCart((s) => s.items);
  const totalPrice = useCart((s) => s.totalPrice);
  const totalItems = useCart((s) => s.totalItems);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <>
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartContainer header={<TitleAnimated title="Carrito de compras" />}>
          <CartList items={items} />
          <CartSummary totalPrice={totalPrice} totalItems={totalItems} />
        </CartContainer>
      )}
    </>
  );
}
export default Cart;
