import React from "react";
import { Link } from "react-router-dom";
import { Divider, useMediaQuery } from "@mui/material";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { Theme } from "../../Theme";
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
        to="about"
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
    </>
  );
};
