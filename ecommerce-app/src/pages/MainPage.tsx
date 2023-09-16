import { Box, Container } from "@mui/material";
import React from "react";
import { MainPageCarousel } from "../components/MainPageCarousel/MainPageCarousel";
import MainPageBanner from "../components/MainPageBanner";
export function MainPage() {
  return (
    <Container>
      <Box mt={6} mb={2}>
        <MainPageCarousel />
        <MainPageBanner />
      </Box>
    </Container>
  );
}
