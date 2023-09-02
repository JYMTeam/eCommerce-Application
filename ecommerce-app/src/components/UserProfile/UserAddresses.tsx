import * as React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../hooks/redux";

export default function UserAddresses() {
  const { errorMessage, loading, loginData } = useAppSelector(
    (state) => state.userLogin,
  );
  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  if (loginData) {
    return <Box sx={{ width: "100%" }}>addresses</Box>;
  }

  return <Box sx={{ width: "100%" }}>No addresses available</Box>;
}
