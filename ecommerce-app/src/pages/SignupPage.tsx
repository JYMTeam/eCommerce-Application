import React from "react";
import { SignupForm } from "../components/SignupForm/SignupForm";
import Container from "@mui/material/Container";

export function SignupPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ height: 1 / 1, pb: 5 }}
      className="container"
    >
      <h1>Sign up here</h1>
      <SignupForm></SignupForm>
    </Container>
  );
}
