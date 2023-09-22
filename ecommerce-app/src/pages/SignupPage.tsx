import React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/SignupForm/SignupForm";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { HeaderTitle } from "../components/basic-components/HeaderTitle/HeaderTitle";

export function SignupPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ height: 1 / 1, pb: 5, padding: { xs: 0, sm: "0 2% 1.5rem" } }}
      className="container"
    >
      <HeaderTitle componentType="h2" text="Sign up here" />
      <SignupForm></SignupForm>
      <Box sx={{ pt: "2em" }}>
        <Link className="redirect-link" to="/login" color="primary">
          Already have an account? Login here
        </Link>
      </Box>
    </Container>
  );
}
