import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { fetchCheckCartAndRemoveProduct } from "../../../../store/actions/cartActions/cartRemoveActions";

interface ICartItemRemove {
  cartArrIndex: number;
}

export const CartRemoveItemButton = ({ cartArrIndex }: ICartItemRemove) => {
  const { cart } = useAppSelector((state) => state.cart);

  const RemoveButtonStyles = {
    ":hover": {
      bgcolor: "transparent",
      color: "primary.dark",
    },
  };

  const dispatch = useAppDispatch();

  const handleRemoveClick = () => {
    if (cart) {
      dispatch(
        fetchCheckCartAndRemoveProduct(cart, cart.lineItems[cartArrIndex].id),
      );
    }
  };

  return (
    <Tooltip title="Remove">
      <IconButton
        color="primary"
        aria-label="remove bag"
        sx={RemoveButtonStyles}
        onClick={handleRemoveClick}
      >
        <RemoveIcon />
      </IconButton>
    </Tooltip>
  );
};
