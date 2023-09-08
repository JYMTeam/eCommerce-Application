import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CURRENT_YEAR } from "../../constants/constants";
import RSS_School_JS_Logo from "../../assets/rss-school-js.svg";

export const FOOTER_MIN_HEIGHT = 4;
const FOOTER_PADDING = "1rem";
const FOOTER_LOGO_URL = "https://rs.school/js/";
const LOGO_LEFT_PADDING = "4rem";
const FOOTER_LOGO_WIDTH = "120px";

export default function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        bgcolor: "primary.dark",
        height: `${FOOTER_MIN_HEIGHT}rem`,
        display: "flex",
        paddingRight: FOOTER_PADDING,
        paddingLeft: FOOTER_PADDING,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Typography variant="h6" component="p" align="center">
        {CURRENT_YEAR}
      </Typography>
      <Box component={"a"} href={FOOTER_LOGO_URL} target="_blank">
        <Box
          component={"img"}
          src={RSS_School_JS_Logo}
          width={FOOTER_LOGO_WIDTH}
          sx={{ pl: LOGO_LEFT_PADDING }}
        ></Box>
      </Box>
    </Box>
  );
}
