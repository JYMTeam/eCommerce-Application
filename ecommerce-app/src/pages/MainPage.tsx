import { Container, Typography } from "@mui/material";
import React from "react";
import { MainPageCarousel } from "../components/MainPageCarousel/MainPageCarousel";
export function MainPage() {
  return (
    <Container>
      <Typography variant="h3" component="h2" align="center" mt={6} mb={4}>
        Welcome to JymTeam bags!
      </Typography>
      <MainPageCarousel />
    </Container>
  );
}
