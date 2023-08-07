import React from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@mui/material";

export function Navigation() {
  return (
    <div>
      <Stack spacing={3} direction="row">
        <Button variant="text">Bags</Button>
        <Button variant="text">Backpacks</Button>
        <Button variant="text">Suitcases</Button>
        <Button variant="text">Wallets</Button>
        {/* <Link to="login">Login</Link> */}
        <Button component={Link} to="Login" variant="contained" color="primary">
          Login
        </Button>
        <Button component={Link} to="Main" variant="contained" color="primary">
          Main
        </Button>
      </Stack>
    </div>
  );
}
