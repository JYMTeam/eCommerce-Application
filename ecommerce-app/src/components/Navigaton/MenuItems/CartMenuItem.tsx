import React from "react";
import { Link } from "react-router-dom";
import { Badge, BadgeProps, Box, Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import CartIcon from "../../../assets/cart.svg";
import { useAppSelector } from "../../../hooks/redux";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 6,
    padding: "0 4px",
  },
}));

export const CartMenuItem = () => {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <Tooltip title="Cart">
      <StyledBadge color="secondary" badgeContent={cart?.totalLineItemQuantity}>
        <Button
          component={Link}
          to="cart"
          variant="contained"
          color="primary"
          sx={{
            maxWidth: "10em",
          }}
        >
          <Box
            component="img"
            src={CartIcon}
            alt={"link to Shopping Cart"}
            sx={{
              height: "1.4rem",
              width: "auto",
            }}
          />
        </Button>
      </StyledBadge>
    </Tooltip>
  );
};
