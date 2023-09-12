import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Box, Divider, List } from "@mui/material";
import CartListItem from "./CartListItem";
import { parseCartListItems } from "../../utils/dataParsers";
import { fetchGetCart } from "../../store/actions/cartActions";

export default function CartList() {
  const { cart, errorMessage, tokenAnonymData } = useAppSelector(
    (state) => state.cart,
  );
  const { tokenPassData, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );

  const dispatch = useAppDispatch();
  const currentToken = isLogged ? tokenPassData?.token : tokenAnonymData?.token;

  useEffect(() => {
    const getActiveCart = async (currentToken: string) => {
      try {
        await dispatch(fetchGetCart(currentToken));
      } catch (cartError) {}
    };

    if (currentToken) {
      getActiveCart(currentToken);
    }
  }, [dispatch, currentToken]);

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  if (!cart || cart.lineItems.length === 0) {
    return <div> Empty Cart</div>;
  }

  const parsedCartListItems = parseCartListItems(cart.lineItems);

  return (
    <>
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
