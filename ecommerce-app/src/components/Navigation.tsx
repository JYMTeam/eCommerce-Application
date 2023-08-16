import React from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@mui/material";

export function Navigation() {
  return (
    <header>
      <Stack spacing={3} direction="row">
        <Button variant="text">Bags</Button>
        <Button variant="text">Backpacks</Button>
        <Button variant="text">Suitcases</Button>
        <Button variant="text">Wallets</Button>
        <Button component={Link} to="login" variant="contained" color="primary">
          Login
        </Button>
        <Button
          component={Link}
          to="registration"
          variant="contained"
          color="primary"
        >
          Registration
        </Button>
        <Button component={Link} to="/" variant="contained" color="primary">
          Main
        </Button>
      </Stack>
    </header>
  );
}
