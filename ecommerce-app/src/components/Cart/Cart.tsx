import React from "react";
import { Box } from "@mui/material";
import CartList from "./CartList/CartList";
import { CartSidebar } from "./CartSidebar";

export const Cart = () => {
  return (
    <Box>
      <CartList />
      <CartSidebar />
    </Box>
  );
};
