import React from "react";
import { Box } from "@mui/material";
import CartList from "./CartList/CartList";
import { CartSidebar } from "./CartSidebar/CartSidebar";

export const Cart = () => {
  const cartSx = {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "row",
    },
    gap: "1.5rem",
  };

  return (
    <Box sx={cartSx}>
      <CartList />
      <CartSidebar />
    </Box>
  );
};
