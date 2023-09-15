import React, { useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { formatPrice } from "../../../utils/utils";

export const CartSidebar = () => {
  const { cart, loading } = useAppSelector((state) => state.cart);
  const [price, setPrice] = React.useState("");
  const [items, setItems] = React.useState("");

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        borderRadius: "4px",
        backgroundColor: "background.paper",
        padding: "1em",
        maxHeight: "200px",
      }}
    >
      <Typography
        variant="h6"
        component="h3"
        sx={{
          textTransform: "uppercase",
        }}
      >
        Total
      </Typography>
      <Stack>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
          }}
        >
          <Typography variant="subtitle1" component="p">
            Quantity:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {items}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
          }}
        >
          <Typography variant="subtitle1" component="p">
            Subtotal:
          </Typography>
          <Typography variant="subtitle1" component="p">
            {price}
          </Typography>
        </Box>
      </Stack>
      <Button variant="contained" size="large" disabled={loading}>
        Checkout
      </Button>
    </Box>
  );
};
