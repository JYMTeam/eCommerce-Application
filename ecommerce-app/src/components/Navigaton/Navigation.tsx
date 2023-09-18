import * as React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Container, useMediaQuery } from "@mui/material";
import { AppBar, Toolbar, Stack, IconButton, Box } from "@mui/material";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { Theme } from "../Theme";
import { MenuItems } from "./MenuItems/MenuItems";
import { CartMenuItem } from "./MenuItems/CartMenuItem";

const menuNavSx = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  alignItems: "center",
};

export const HEADER_MIN_HEIGHT = 6;

export function Navigation() {
  const isMobile = useMediaQuery(Theme.breakpoints.down("md"));
  const [shouldCloseDrawer] = React.useState(true);

  return (
    <AppBar
      position="static"
      style={{ background: "transparent", boxShadow: "none" }}
      sx={{ minHeight: `${HEADER_MIN_HEIGHT}rem` }}
    >
      <Container maxWidth="xl" sx={{ pl: 0, pr: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between", pl: 0, pr: 0 }}>
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
          {isMobile ? (
            <Box component={"nav"} sx={menuNavSx}>
              <CartMenuItem></CartMenuItem>
              <MobileMenu shouldCloseDrawer={shouldCloseDrawer} />
            </Box>
          ) : (
            <Stack spacing={3} direction="row">
              <MenuItems shouldCloseDrawer={shouldCloseDrawer} />
              <CartMenuItem></CartMenuItem>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
