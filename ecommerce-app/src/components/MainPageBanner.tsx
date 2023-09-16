import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import discountImg from "../assets/simplistic-bags-with-discount.png";

export default function MainPageBanner() {
  const promocodeData = {
    title: "Use this promocode on your first purchase and get 10% off!",
    promo: "rsschool",
    img: discountImg,
  };
  return (
    <Paper
      className="promo-banner"
      sx={{
        mt: 4,
        margin: "30px auto",
        width: "calc(100% - 2px)",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid
        className="promo-banner-text"
        item
        xs
        container
        direction="column"
        spacing={2}
        m={2}
        textAlign="center"
      >
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1" component="div">
            {promocodeData.title}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {promocodeData.promo}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
