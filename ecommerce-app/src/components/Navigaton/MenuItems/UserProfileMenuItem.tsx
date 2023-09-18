import React from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useAppDispatch } from "../../../hooks/redux";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { cartReset } from "../../../store/slices/cartSlice";
import { logoutUser } from "../../../store/actions/userActions/userLoginActions";

export const UserProfileMenuItem = ({
  shouldCloseDrawer = true,
}: {
  shouldCloseDrawer: boolean;
}) => {
  const dispatch = useAppDispatch();

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(logoutUser());
    dispatch(cartReset());
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="User Profile">
          <IconButton
            color="primary"
            aria-label="user-profile"
            sx={{
              ":hover": {
                bgcolor: "transparent",
                color: "primary.dark",
              },
            }}
            component={Link}
            to="user-profile"
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton
            color="primary"
            aria-label="logout"
            sx={{
              marginLeft: {
                xs: "0",
                sm: "24px",
              },
              ":hover": {
                bgcolor: "transparent",
                color: "primary.dark",
              },
            }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
