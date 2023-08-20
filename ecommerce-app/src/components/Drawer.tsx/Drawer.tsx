import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/cart.svg";
import "./drawer.css";
import { SwipeableDrawer } from "@mui/material";
import { Stack, Button, IconButton, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userLoginReset } from "../../store/slices/userLoginSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
export const Drawer = () => {
  const { isLogged } = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
      >
        <div onClick={() => setOpen(false)} role="button" tabIndex={0}>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>

        <Stack spacing={3} direction="column">
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
      </SwipeableDrawer>
    </>
  );
};
