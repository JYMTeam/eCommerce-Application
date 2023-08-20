import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import CartIcon from "../../assets/cart.svg";
import { Container, useMediaQuery } from "@mui/material";
import { AppBar, Toolbar, Stack, Button, IconButton, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userLoginReset } from "../../store/slices/userLoginSlice";
import { Drawer } from "../Drawer.tsx/Drawer";
import { Theme } from "../Theme";

//import { SystemStyleObject } from "@mui/system";
export function Navigation() {
  const { isLogged } = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();
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
                sx={{ whiteSpace: "nowrap" }}
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
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
