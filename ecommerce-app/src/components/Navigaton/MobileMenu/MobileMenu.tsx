import React, { useState } from "react";
import "./MobileMenu.css";
import { SwipeableDrawer } from "@mui/material";
import { Stack, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItems } from "../MenuItems/MenuItems";

export const MobileMenu = ({
  shouldCloseDrawer,
}: {
  shouldCloseDrawer: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const handleToggleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <IconButton onClick={handleToggleOpen}>
        <MenuIcon color="primary" fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={handleToggleOpen}
        onClose={handleToggleOpen}
        onClick={() => {
          if (shouldCloseDrawer) {
            setOpen(false);
          }
        }}
      >
        <div onClick={() => setOpen(false)} role="button" tabIndex={0}>
          <IconButton>
            <CloseIcon color="primary" fontSize="medium" />
          </IconButton>
        </div>

        <Stack spacing={3} direction="column" alignItems="center">
          <MenuItems />
        </Stack>
      </SwipeableDrawer>
    </>
  );
};
