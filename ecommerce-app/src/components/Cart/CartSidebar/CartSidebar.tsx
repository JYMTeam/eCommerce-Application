import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { formatPrice } from "../../../utils/utils";
import { Promocode } from "../Promocode";
const CART_SIDEBAR_BORDER_COLOR = "#dbd8d8";

export const cartSidebarBoxSx = {
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "column",
    md: "column",
  },
  justifyContent: "space-between",
  alignItems: {
    xs: "initial",
    sm: "center",
  },
  position: {
    xs: "sticky",
    sm: "sticky",
    md: "static",
  },
  bottom: "0",
  maxHeight: "20rem",
  padding: "1em",
  backgroundColor: {
    xs: "#ffffffd9",
    sm: "#ffffffd9",
    md: "background.paper",
  },
  boxShadow: "none",
  borderRadius: 0,
  border: `1px solid ${CART_SIDEBAR_BORDER_COLOR}`,
  zIndex: "1",
};

const cartSidebarHeaderSx = {
  textTransform: "uppercase",
};

export const cartSidebarItemSx = {
  display: "flex",
  gap: "0.938rem",
};

export const cartSidebarPromoSx = {
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row",
    md: "row",
  },
};

export const CartSidebar = () => {
  const { cart, loading } = useAppSelector((state) => state.cart);
  const [price, setPrice] = useState("");
  const [items, setItems] = useState("");

  useEffect(() => {
    if (cart) {
      const usdPrice = formatPrice(
        cart.totalPrice.centAmount,
        cart.totalPrice.currencyCode,
      );
      setPrice(usdPrice);
      const quantityCart = `${cart.totalLineItemQuantity || ""}`;
      setItems(quantityCart);
    }
  }, [cart]);

  return (
    <>
      <Box sx={cartSidebarBoxSx}>
        <Typography variant="h6" component="h3" sx={cartSidebarHeaderSx}>
          Total
        </Typography>
        <Stack>
          <Box sx={cartSidebarItemSx}>
            <Typography variant="subtitle1" component="p">
              Quantity:
            </Typography>
            <Typography variant="subtitle1" component="p">
              {items}
            </Typography>
          </Box>
          <Box sx={cartSidebarItemSx}>
            <Typography variant="subtitle1" component="p">
              Subtotal:
            </Typography>
            <Typography variant="subtitle1" component="p">
              {price}
            </Typography>
          </Box>
        </Stack>
        <Box sx={cartSidebarPromoSx} mt={2} mb={4}>
          <Promocode />
        </Box>
        <Button variant="contained" size="large" disabled={loading}>
          Checkout
        </Button>
      </Box>
    </>
  );
};
