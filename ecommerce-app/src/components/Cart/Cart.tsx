import React from "react";
import { Box } from "@mui/material";
import CartList from "./CartList/CartList";
import { CartSidebar } from "./CartSidebar/CartSidebar";
import { useAppSelector } from "../../hooks/redux";
import { NOT_FOUND_MESSAGE } from "../../commercetools-sdk/errors/errors";
import { CartEmpty } from "./CartList/CartEmpty";
import { Promocode } from "./Promocode";

const cartSx = {
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "column",
    md: "row",
  },
  gap: "1.5rem",
};

export const Cart = () => {
  const { cart, errorMessage } = useAppSelector((state) => state.cart);

  if (errorMessage && errorMessage !== NOT_FOUND_MESSAGE) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  if (!cart || cart.lineItems.length === 0) {
    return <CartEmpty />;
  }
  return (
    <Box sx={cartSx}>
      <CartList />
      <CartSidebar />
      <Promocode />
    </Box>
  );
};
