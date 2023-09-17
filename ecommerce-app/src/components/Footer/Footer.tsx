import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CURRENT_YEAR } from "../../constants/constants";
import RSS_School_JS_Logo from "../../assets/rss-school-js.svg";

export const FOOTER_MIN_HEIGHT = 4;
const FOOTER_PADDING = "1rem";
const FOOTER_LOGO_URL = "https://rs.school/js/";
const FOOTER_JYM_TEAM_URL = "mailto:jymteam2023@gmail.com";
const FOOTER_LOGO_WIDTH = "110px";
const FOOTER_iTEMS_GAP = "1em";
const FOOTER_LINK_COLOR = "#000000";
const FOOTER_LINK_TRANSITION = "all 0.3s ease-in";
const FOOTER_LINK_HOVER = {
  bgcolor: "transparent",
  color: "primary.dark",
};

const footerSx = {
  height: `${FOOTER_MIN_HEIGHT}rem`,
  display: "flex",
  flexWrap: "wrap",
  gap: FOOTER_iTEMS_GAP,
  paddingRight: FOOTER_PADDING,
  paddingLeft: FOOTER_PADDING,
  alignItems: "center",
  justifyContent: "space-between",
};

const footerJYMTeamUrlSx = {
  textDecoration: "none",
  textTransform: "uppercase",
  color: FOOTER_LINK_COLOR,
  transition: FOOTER_LINK_TRANSITION,
  ":hover": FOOTER_LINK_HOVER,
};

export default function Footer() {
  return (
    <Box component={"footer"} sx={footerSx}>
      <Box
        color="primary"
        component={"a"}
        href={FOOTER_JYM_TEAM_URL}
        sx={footerJYMTeamUrlSx}
      >
        <Typography variant="body2" component="p" align="center">
          JYM&nbsp;Team&nbsp;{CURRENT_YEAR}
        </Typography>
      </Box>
      <Box component={"a"} href={FOOTER_LOGO_URL} target="_blank">
        <Box
          component={"img"}
          src={RSS_School_JS_Logo}
          width={FOOTER_LOGO_WIDTH}
        ></Box>
      </Box>
    </Box>
  );
}
