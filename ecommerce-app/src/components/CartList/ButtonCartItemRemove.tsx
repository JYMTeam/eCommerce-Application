import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRemoveProductFromCart } from "../../store/actions/cartActions";

interface ICartItemRemove {
  cartArrIndex: number;
}

export const ButtonCartItemRemove = ({ cartArrIndex }: ICartItemRemove) => {
  const { cart, tokenAnonymData } = useAppSelector((state) => state.cart);
  const { tokenPassData, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );
  const RemoveButtonStyles = {
    ":hover": {
      bgcolor: "transparent",
      color: "primary.dark",
    },
  };

  const dispatch = useAppDispatch();

  const handleRemoveClick = () => {
    let currentToken = "";

    if (isLogged && tokenPassData) {
      currentToken = tokenPassData.token;
    } else if (tokenAnonymData) {
      currentToken = tokenAnonymData.token;
    }

    if (currentToken && cart) {
      dispatch(
        fetchRemoveProductFromCart(
          currentToken,
          cart,
          cart.lineItems[cartArrIndex].id,
        ),
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
