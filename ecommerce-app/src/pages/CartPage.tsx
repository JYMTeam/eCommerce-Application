import React from "react";
import { useAppSelector } from "../hooks/redux";

export function CartPage() {
  const { cart } = useAppSelector((state) => state.cart);
  return (
    <>
      {cart && (
        <div>
          {cart.lineItems.map((item, i) => (
            <div key={i}>
              product -- {item.name["en"]} - quantity - {item.quantity}
            </div>
          ))}
        </div>
      )}
      {(!cart || cart.lineItems.length === 0) && <div> Empty Cart</div>}
    </>
  );
}
