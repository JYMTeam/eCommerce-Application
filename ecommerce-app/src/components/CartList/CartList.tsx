import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { Box, Divider, List } from "@mui/material";
import CartListItem from "./CartListItem";
import { parseCartListItems } from "../../utils/dataParsers";

export default function CartList() {
  const { cart, errorMessage } = useAppSelector((state) => state.cart);

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
