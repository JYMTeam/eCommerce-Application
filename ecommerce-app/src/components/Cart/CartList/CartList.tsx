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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexGrow: "1",
        backgroundColor: "background.paper",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        borderRadius: "4px",
        padding: "1em",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            textTransform: "uppercase",
          }}
        >
          Shopping&nbsp;Cart
        </Typography>
        <CartRemoveAllButton />
      </Box>
      <List component="ul" sx={{ flexGrow: "1", width: "100%" }}>
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
