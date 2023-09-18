import React from "react";
import { ITeamMembersInfo } from "../../types";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface IBioCardPartProps {
  data: ITeamMembersInfo;
}

const CARD_TITLE_FONTSIZE = 18;
const CARD_DESC_FONTSIZE = 14;
const CARD_DESC_MB = 1.5;

const wrapperBoxSx = {
  width: { md: 1 / 2, xs: 1 },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: { xs: "1em", sm: "2em", md: "2.5em" },
  paddingBottom: { xs: "0", sm: "0", md: "0" },
  boxSizing: "border-box",
};
const cardTitleSx = {
  fontSize: CARD_TITLE_FONTSIZE,
  textTransform: "uppercase",
};
const cardSubtitleSx = {
  mb: CARD_DESC_MB,
  fontSize: CARD_DESC_FONTSIZE,
  marginBottom: "5%",
};
const cardMainTextSx = {
  mb: CARD_DESC_MB,
  fontSize: CARD_DESC_FONTSIZE,
  textAlign: "left",
  marginBottom: "7%",
};
const cardSecondaryTextSx = {
  mb: CARD_DESC_MB,
  fontSize: CARD_DESC_FONTSIZE,
  textAlign: "left",
};
const cardActionsSx = { justifyContent: "center", width: "100%" };
const cardButtonSx = {
  width: "100%",
  ":hover": {
    color: "#fff",
    background: "#f9c15299",
  },
};

export default function BioCardPart({
  data: {
    contributionDesc,
    name,
    role,
    bio,
    githubLink,
    color,
    textColor,
    buttonColor,
  },
}: IBioCardPartProps) {
  return (
    <Box sx={{ ...wrapperBoxSx, backgroundColor: color }}>
      <CardContent sx={{ flexGrow: "1", padding: { xs: 0 } }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          color={textColor}
          sx={cardTitleSx}
        >
          {name}
        </Typography>
        <Typography variant="body2" color={textColor} sx={cardSubtitleSx}>
          {role as unknown as string}
        </Typography>
        <Typography variant="body2" color={textColor} sx={cardMainTextSx}>
          {bio as unknown as string}
        </Typography>
        <Typography variant="body2" color={textColor} sx={cardSecondaryTextSx}>
          {contributionDesc as unknown as string}
        </Typography>
      </CardContent>
      <CardActions sx={cardActionsSx}>
        <Button
          component="a"
          size="large"
          variant="text"
          sx={{ ...cardButtonSx, color: buttonColor }}
          href={githubLink}
          target="_blank"
        >
          See github
        </Button>
      </CardActions>
    </Box>
  );
}
