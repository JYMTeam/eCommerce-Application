import React from "react";
import workingGif from "../assets/working.gif";
import { Link } from "react-router-dom";

import { Typography, Box, Grid, Button } from "@mui/material";
export default function WorkInProgress() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ my: 20 }}
    >
      <Typography variant="h2" component="h2">
        Come back later!
      </Typography>
      <Typography>We are working on this page!</Typography>
      <Box
        component="img"
        src={workingGif}
        alt={"Work in progress"}
        sx={{ height: "100%", width: "auto" }}
      />
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Main page
      </Button>
    </Grid>
  );
}
