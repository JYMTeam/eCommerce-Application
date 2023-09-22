import React from "react";
import { Box } from "@mui/material";
import { MainPageCarousel } from "../components/MainPageCarousel/MainPageCarousel";
import MainPageBanner from "../components/MainPageBanner";
export function MainPage() {
  return (
    <>
      <Box mt={6} mb={2}>
        <MainPageCarousel />
        <MainPageBanner />
      </Box>
    </>
  );
}
