import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Box, Divider, List } from "@mui/material";
import CartListItem from "./CartListItem";
import { parseCartListItems } from "../../utils/dataParsers";
import { fetchGetCart } from "../../store/actions/cartActions";
import { ClientResponse } from "@commercetools/sdk-client-v2";
import { ErrorResponse } from "@commercetools/platform-sdk";
import { NOT_FOUND_MESSAGE } from "../../commercetools-sdk/errors/errors";
import { statusCode } from "../../types";
import { CartRemoveAllButton } from "./CartRemoveAllButton";

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
    return <div>Empty Cart</div>;
  }

  const parsedCartListItems = parseCartListItems(cart.lineItems);

  return (
    <>
      <CartRemoveAllButton />
      <List component="ul">
        {parsedCartListItems.map((item, index) => (
          <Box key={index} component={"nav"}>
            <CartListItem data={item} />
            <Divider component="li" />
          </Box>
        ))}
      </List>
    </>
  );
}
