import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/cart.svg";
import { Divider, useMediaQuery } from "@mui/material";
import { Button, Box } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";
import { Theme } from "../Theme";
import { UserProfileMenuItem } from "./UserProfileMenuItem";

export const MenuItems = ({
  shouldCloseDrawer = true,
}: {
  shouldCloseDrawer?: boolean;
}) => {
  const { isLogged } = useAppSelector((state) => state.userLogin);
  const isMobile = useMediaQuery(Theme.breakpoints.down("md"));
  return (
    <>
      <Button
        variant="text"
        component={Link}
        to="/"
        sx={{
          ":hover": {
            bgcolor: "transparent",
            color: "primary.dark",
          },
        }}
      >
        Main
      </Button>
      <Button
        variant="text"
        component={Link}
        to="shop"
        sx={{
          ":hover": {
            bgcolor: "transparent",
            color: "primary.dark",
          },
        }}
      >
        Shop
      </Button>
      <Button
        variant="text"
        component={Link}
        to="aboutus"
        sx={{
          ":hover": {
            bgcolor: "transparent",
            color: "primary.dark",
          },
        }}
      >
        About Us
      </Button>
      {isMobile && <Divider />}
      {!isLogged && (
        <Button
          component={Link}
          to="login"
          color="primary"
          variant="contained"
          size="large"
          sx={{ whiteSpace: "nowrap" }}
        >
          Login
        </Button>
      )}
      {!isLogged && (
        <Button
          component={Link}
          to="signup"
          variant="contained"
          color="primary"
          size="large"
          sx={{ whiteSpace: "nowrap" }}
        >
          Sign Up
        </Button>
      )}
      {isLogged && (
        <UserProfileMenuItem shouldCloseDrawer={shouldCloseDrawer} />
      )}
      {isMobile && <Divider />}
      <Button
        component={Link}
        to="cart"
        variant="contained"
        color="primary"
        sx={{ maxWidth: "10em" }}
      >
        <Box
          component="img"
          src={CartIcon}
          alt={"link to Shopping Cart"}
          sx={{ height: "1.4rem", width: "auto" }}
        />
      </Button>
    </>
  );
};
