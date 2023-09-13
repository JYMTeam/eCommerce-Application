import React from "react";
import { Box } from "@mui/material";
import CartList from "../components/CartList/CartList";

export function CartPage() {
  return (
    <Box component={"main"}>
      <CartList />
    </Box>
  );
}
