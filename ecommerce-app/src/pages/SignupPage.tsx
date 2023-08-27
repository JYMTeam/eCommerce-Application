import React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/SignupForm/SignupForm";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";

export function SignupPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ height: 1 / 1, pb: 5 }}
      className="container"
    >
      <h2>Sign up here</h2>
      <SignupForm></SignupForm>
      <Box sx={{ pt: "2em" }}>
        <Link className="redirect-link" to="/login" color="primary">
          Already have an account? Login here
        </Link>
      </Box>
    </Container>
  );
}
