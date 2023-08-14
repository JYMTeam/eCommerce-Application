import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import CartIcon from "../assets/cart.svg";
import { AppBar, Toolbar, Stack, Button, IconButton, Box } from "@mui/material";

//import { SystemStyleObject } from "@mui/system";

export function Navigation() {
  // const classes: SystemStyleObject = {
  //   flexGrow: {
  //     flex: "1",
  //   },
  //   button: {
  //     "&:hover": {
  //       bgcolor: "transparent",
  //       color: "primary.dark",
  //     },
  //   },
  // };
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
              bgcolor: "transparent", // theme.palette.primary.main
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
            to="/"
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
            to="Login"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="Signup"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Button component={Link} to="/" variant="contained" color="primary">
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
