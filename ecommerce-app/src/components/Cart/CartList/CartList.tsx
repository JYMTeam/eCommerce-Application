import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Box, Divider, List, Typography } from "@mui/material";
import CartListItem from "./CartListItem/CartListItem";
import { parseCartListItems } from "../../../utils/dataParsers";
import { fetchGetCart } from "../../../store/actions/cartActions/cartActions";
import { ClientResponse } from "@commercetools/sdk-client-v2";
import { ErrorResponse } from "@commercetools/platform-sdk";
import { NOT_FOUND_MESSAGE } from "../../../commercetools-sdk/errors/errors";
import { statusCode } from "../../../types";
import { CartRemoveAllButton } from "./CartRemoveAllButton";
import { CartEmpty } from "./CartEmpty";
const CART_LIST_BORDER_COLOR = "#dbd8d8";

const cartListBoxSx = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  flexGrow: "1",
  backgroundColor: "background.paper",
  boxShadow: 0,
  borderRadius: 0,
  border: `1px solid ${CART_LIST_BORDER_COLOR}`,
  padding: "1em",
};

const cartListHeaderSx = {
  textTransform: "uppercase",
};

const cartListSx = {
  flexGrow: "1",
  width: "100%",
};

export default function CartList() {
  const { cart, errorMessage, tokenAnonymData } = useAppSelector(
    (state) => state.cart,
  );
  const { tokenPassData, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );

  const [emptyCartError, setEmptyCartError] = useState(false);

  const dispatch = useAppDispatch();
  const currentToken = isLogged
    ? tokenPassData?.refreshToken
    : tokenAnonymData?.refreshToken;

  useEffect(() => {
    const getActiveCart = async () => {
      try {
        await dispatch(fetchGetCart());
      } catch (cartError) {
        const error = cartError as ClientResponse<ErrorResponse>;
        const body = error.body;
        if (body && body.statusCode === statusCode.NOT_FOUND) {
          setEmptyCartError(true);
        }
      }
    };

    if (currentToken) {
      getActiveCart();
    }
  }, [dispatch, currentToken]);

  if (errorMessage && errorMessage !== NOT_FOUND_MESSAGE) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  if (!cart || cart.lineItems.length === 0 || emptyCartError) {
    return <CartEmpty />;
  }

  const parsedCartListItems = parseCartListItems(cart.lineItems);

  return (
    <Box sx={cartListBoxSx}>
      <Box>
        <Typography variant="h6" component="h3" sx={cartListHeaderSx}>
          Shopping&nbsp;Cart
        </Typography>
        <CartRemoveAllButton />
      </Box>
      <List component="ul" sx={cartListSx}>
        {parsedCartListItems.map((item, index) => (
          <Box key={index} component={"nav"}>
            <Divider component="li" />
            <CartListItem data={item} />
          </Box>
        ))}
      </List>
    </Box>
  );
}
