import * as React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../hooks/redux";

export default function UserInformation() {
  const { errorMessage, loading } = useAppSelector((state) => state.userLogin);

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  return <Box sx={{ width: "100%" }}></Box>;
}
