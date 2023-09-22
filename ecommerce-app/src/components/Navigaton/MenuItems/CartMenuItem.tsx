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

const cartButtonSx = {
  pr: "1px",
  pl: "1px",
  minWidth: { xs: "40px", sm: "64px" },
  maxHeight: { xs: "35px", sm: "100%" },
};

const cartIconSx = {
  height: "1.4rem",
  width: "auto",
};

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
          sx={cartButtonSx}
        >
          <Box
            component="img"
            src={CartIcon}
            alt={"link to Shopping Cart"}
            sx={cartIconSx}
          />
        </Button>
      </StyledBadge>
    </Tooltip>
  );
};
