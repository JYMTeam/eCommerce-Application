import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../hooks/redux";
import { userLoginReset } from "../../store/slices/userLoginSlice";
import PersonIcon from "@mui/icons-material/Person";
import { cartReset } from "../../store/slices/cartSlice";

const settings = ["Profile", "Log out"];
export const UserProfileMenuItem = ({
  shouldCloseDrawer = true,
}: {
  shouldCloseDrawer: boolean;
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const dispatch = useAppDispatch();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (shouldCloseDrawer) {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(userLoginReset());
    dispatch(cartReset());
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="User profile">
          <IconButton
            color="primary"
            aria-label="user-profile"
            sx={{
              ":hover": {
                bgcolor: "transparent",
                color: "primary.dark",
              },
            }}
            onClick={handleOpenUserMenu}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            component={Link}
            to="user-profile"
            key={settings[0]}
            onClick={handleCloseUserMenu}
          >
            <Typography textAlign="center">{settings[0]}</Typography>
          </MenuItem>
          <MenuItem key={settings[1]} onClick={handleLogout}>
            <Typography textAlign="center">{settings[1]}</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
