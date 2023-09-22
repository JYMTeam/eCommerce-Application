import React from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { HeaderTitle } from "../components/basic-components/HeaderTitle/HeaderTitle";

export function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ mb: 3, padding: { xs: 0 } }}>
      <HeaderTitle componentType="h2" text="Account login" />
      <LoginForm></LoginForm>
      <Box sx={{ pt: "2em" }}>
        <Link className="redirect-link" to="/signup" color="primary">
          Not yet a member? Sign up here
        </Link>
      </Box>
    </Container>
  );
}
