import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Grid, Button } from "@mui/material";

type Data = {
  title: string;
  desc: string;
  img: string;
};
export const MissingPageTemplate = ({ title, desc, img }: Data) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Typography variant="h3" component="h2" align="center">
        {title}
      </Typography>
      <Typography>{desc}</Typography>
      <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
        <Box
          component="img"
          src={img}
          alt={title}
          sx={{ height: "40vh", maxwidth: "100%" }}
        />
      </Box>
      <Box sx={{ mb: "2em" }}>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Main page
        </Button>
      </Box>
    </Grid>
  );
};
