import React from "react";
import errorGif from "../assets/error-404.gif";
import { Link } from "react-router-dom";

import { Typography, Box, Grid, Button } from "@mui/material";
export default function NotFoundPage() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ my: 20 }}
    >
      <Typography variant="h2" component="h2">
        Oops!
      </Typography>
      <Typography>We can't find the page you are looking for!</Typography>
      <Box
        component="img"
        src={errorGif}
        alt={"404"}
        sx={{ height: "100%", width: "auto" }}
      />
      <Box sx={{ mb: "4em" }}>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Main page
        </Button>
      </Box>
    </Grid>
  );
}
