import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { fetchCheckCartAndRemoveProduct } from "../../../../store/actions/cartActions/cartRemoveActions";

interface ICartItemRemove {
  cartArrIndex: number;
}

const removeButtonSx = {
  position: "absolute",
  top: "-0.313rem",
  right: "-0.625rem",
};

const removeButtonIconSx = {
  ":hover": {
    bgcolor: "transparent",
    color: "primary.dark",
  },
};

export const CartRemoveItemButton = ({ cartArrIndex }: ICartItemRemove) => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveClick = () => {
    if (cart) {
      dispatch(
        fetchCheckCartAndRemoveProduct(cart, cart.lineItems[cartArrIndex].id),
      );
    }
  };

  return (
    <Box sx={removeButtonSx}>
      <Tooltip title="Remove">
        <IconButton
          color="primary"
          aria-label="remove bag"
          sx={removeButtonIconSx}
          onClick={handleRemoveClick}
        >
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
