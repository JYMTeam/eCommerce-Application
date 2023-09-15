import React from "react";
import { Box } from "@mui/material";
import CartList from "./CartList/CartList";
import { CartSidebar } from "./CartSidebar/CartSidebar";

export const Cart = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "1.5rem",
      }}
    >
      <CartList />
      <CartSidebar />
    </Box>
  );
};
