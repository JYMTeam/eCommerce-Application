import React from "react";
import { ITeamMembersInfo } from "../../types";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface IContributionCardPartProps {
  data: ITeamMembersInfo;
}

const CARD_TITLE_FONTSIZE = 18;
const CARD_DESC_FONTSIZE = 14;
const CARD_DESC_MB = 1.5;

export default function ContributionCardPart({
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
}: IContributionCardPartProps) {
  return (
    <Box
      sx={{
        width: { md: 1 / 2, xs: 1 },
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: { xs: "1em", sm: "2em", md: "2.5em" },
        paddingBottom: { xs: "0", sm: "0", md: "0" },
        boxSizing: "border-box",
      }}
    >
      <CardContent sx={{ flexGrow: "1", padding: { xs: 0 } }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          color={textColor}
          sx={{ fontSize: CARD_TITLE_FONTSIZE, textTransform: "uppercase" }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color={textColor}
          sx={{
            mb: CARD_DESC_MB,
            fontSize: CARD_DESC_FONTSIZE,
            marginBottom: "5%",
          }}
        >
          {role as unknown as string}
        </Typography>
        <Typography
          variant="body2"
          color={textColor}
          sx={{
            mb: CARD_DESC_MB,
            fontSize: CARD_DESC_FONTSIZE,
            textAlign: "left",
            marginBottom: "7%",
          }}
        >
          {bio as unknown as string}
        </Typography>

        <Typography
          variant="body2"
          color={textColor}
          sx={{
            mb: CARD_DESC_MB,
            fontSize: CARD_DESC_FONTSIZE,
            textAlign: "left",
          }}
        >
          {contributionDesc as unknown as string}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", width: "100%" }}>
        <Button
          component="a"
          size="large"
          variant="text"
          sx={{
            color: buttonColor,
            width: "100%",
            ":hover": {
              color: "#fff",
              background: "#f9c15299",
            },
          }}
          href={githubLink}
          target="_blank"
        >
          See github
        </Button>
      </CardActions>
    </Box>
  );
}
