import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import {
  fetchAddProductsCart,
  fetchRemoveProductsCart,
} from "../../../../store/actions/cartActions/cartActions";

const buttonSx = {
  ":hover": {
    bgcolor: "transparent",
    color: "primary.dark",
  },
};

const cartListItemQuantitySx = {
  display: "flex",
  alignItems: "center",
  gap: "0.25em",
  justifyContent: {
    xs: "center",
    sm: "initial",
  },
};

interface ICartListItemQuantity {
  cartArrIndex: number;
}

export const CartListItemQuantity = ({
  cartArrIndex,
}: ICartListItemQuantity) => {
  const { cart, loading } = useAppSelector((state) => state.cart);
  const { products } = useAppSelector((state) => state.products);
  const [itemQuantity, setItemQuantity] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cart) setItemQuantity(cart.lineItems[cartArrIndex].quantity);
  }, [cart, cartArrIndex]);

  const handlerOnDecrease = () => {
    if (cart) {
      const lineItemId = cart.lineItems[cartArrIndex].id;
      if (lineItemId) dispatch(fetchRemoveProductsCart(cart, lineItemId, 1));
    }
  };

  const handlerOnIncrease = () => {
    if (cart && products) {
      const selectProduct = cart.lineItems[cartArrIndex].productId;
      if (selectProduct) {
        dispatch(fetchAddProductsCart(cart, selectProduct, 1));
      }
    }
  };

  return (
    <Box sx={cartListItemQuantitySx}>
      <Tooltip title="decrease">
        <span>
          <IconButton
            color="primary"
            aria-label="decrease"
            size="small"
            disabled={itemQuantity <= 1 || loading}
            sx={buttonSx}
            onClick={handlerOnDecrease}
          >
            <RemoveIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Typography>{itemQuantity}</Typography>
      <Tooltip title="increase">
        <span>
          <IconButton
            color="primary"
            aria-label="user-profile"
            size="small"
            sx={buttonSx}
            disabled={loading}
            onClick={handlerOnIncrease}
          >
            <AddIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};
