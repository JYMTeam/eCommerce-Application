import React, { useState } from "react";
import "./drawer.css";
import { SwipeableDrawer } from "@mui/material";
import { Stack, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItems } from "../MenuItems/MenuItems";

export const Drawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon color="primary" fontSize="large" />
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
