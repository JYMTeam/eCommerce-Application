import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

type IPromoData = {
  title: string;
  promo: string;
  className: string;
};
export default function MainPageBanners() {
  const promocodeData1 = {
    title: "Use this promocode to get 10% off total cart!",
    promo: "rsschool",
    className: "promo-banner-01",
  };
  const promocodeData2 = {
    title: "Use this promocode and get $50 off total cart!",
    promo: "50dollarsoff",
    className: "promo-banner-02",
  };
  const addPromoBanner = (promocodeData: IPromoData) => {
    return (
      <Paper
        className={promocodeData.className}
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
  };
  return (
    <>
      {addPromoBanner(promocodeData1)}
      {addPromoBanner(promocodeData2)}
    </>
  );
}
