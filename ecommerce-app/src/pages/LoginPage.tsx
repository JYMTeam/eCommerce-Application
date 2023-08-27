import React from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ mb: 3 }}>
      <h2>Account login</h2>
      <LoginForm></LoginForm>
      <Box sx={{ pt: "2em" }}>
        <Link className="redirect-link" to="/signup" color="primary">
          Not yet a member? Sign up here
        </Link>
      </Box>
    </Container>
  );
}
