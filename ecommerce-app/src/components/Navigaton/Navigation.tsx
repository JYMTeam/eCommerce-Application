import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import CartIcon from "../../assets/cart.svg";
import { AppBar, Toolbar, Stack, Button, IconButton, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logout } from "../../store/slices/userLogoutSlice";

//import { SystemStyleObject } from "@mui/system";

export function Navigation() {
  const { isLogged } = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();
  return (
    <AppBar
      position="static"
      style={{ background: "transparent", boxShadow: "none" }}
      sx={{ minHeight: "6rem" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          component={Link}
          to="/"
          sx={{
            ":hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt={"link to Main page"}
            sx={{ height: "4rem", width: "auto" }}
          />
        </IconButton>

        <Stack spacing={3} direction="row">
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
            component={Link}
            to="login"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          {isLogged && (
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(logout());
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
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="cart"
            variant="contained"
            color="primary"
          >
            <Box
              component="img"
              src={CartIcon}
              alt={"link to Shopping Cart"}
              sx={{ height: "1.4rem", width: "auto" }}
            />
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
