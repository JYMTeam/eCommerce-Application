import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/cart.svg";
import { Divider, useMediaQuery } from "@mui/material";
import { Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userLoginReset } from "../../store/slices/userLoginSlice";
import { Theme } from "../Theme";
export const MenuItems = () => {
  const { isLogged } = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();
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
      {isMobile && <Divider />}
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
      {isLogged && (
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ whiteSpace: "nowrap" }}
          onClick={() => {
            dispatch(userLoginReset());
          }}
        >
          Log out
        </Button>
      )}
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