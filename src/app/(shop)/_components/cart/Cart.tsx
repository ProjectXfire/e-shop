"use client";

import { cart } from "../../../../../data/seed";
import CartContainer from "../cart-container/CartContainer";
import CartList from "../cart-list/CartList";
import CartSummary from "../cart-summary/CartSummary";
import EmptyCart from "../empty-cart/EmptyCart";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

function Cart() {
  const totalPrice = cart.reduce((acc, cv) => acc + cv.price * cv.qtty, 0);

  return (
    <>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartContainer header={<TitleAnimated title="Carrito de compras" />}>
          <CartList items={cart} />
          <CartSummary itemsTotalPrice={totalPrice} />
        </CartContainer>
      )}
    </>
  );
}
export default Cart;
