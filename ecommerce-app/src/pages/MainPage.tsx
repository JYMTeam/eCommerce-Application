import { Box, Container } from "@mui/material";
import React from "react";
import { MainPageCarousel } from "../components/MainPageCarousel/MainPageCarousel";
export function MainPage() {
  return (
    <Container>
      <Box mt={6} mb={2}>
        <MainPageCarousel />
      </Box>
    </Container>
  );
}
