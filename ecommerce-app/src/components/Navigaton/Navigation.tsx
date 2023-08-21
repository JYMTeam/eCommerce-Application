import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Container, useMediaQuery } from "@mui/material";
import { AppBar, Toolbar, Stack, IconButton, Box } from "@mui/material";
import { Drawer } from "../Drawer/Drawer";
import { Theme } from "../Theme";
import { MenuItems } from "../MenuItems/MenuItems";

export function Navigation() {
  const isMobile = useMediaQuery(Theme.breakpoints.down("md"));
  return (
    <AppBar
      position="static"
      style={{ background: "transparent", boxShadow: "none" }}
      sx={{ minHeight: "6rem" }}
    >
      <Container maxWidth="xl">
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
          {isMobile ? (
            <Drawer />
          ) : (
            <Stack spacing={3} direction="row">
              <MenuItems />
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
