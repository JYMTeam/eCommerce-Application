import { Container, Typography } from "@mui/material";
import React from "react";
import Footer, { FOOTER_MIN_HEIGHT } from "../components/Footer/Footer";
import { HEADER_MIN_HEIGHT } from "../components/Navigaton/Navigation";

const MAIN_HEIGTH_CALC = HEADER_MIN_HEIGHT + FOOTER_MIN_HEIGHT;

export function AboutUsPage() {
  return (
    <>
      <Container
        component={"main"}
        sx={{ minHeight: `calc(100vh - ${MAIN_HEIGTH_CALC}rem);` }}
      >
        <Typography variant="h3" component="h2" align="center">
          About us
        </Typography>
      </Container>
      <Footer></Footer>
    </>
  );
}
