import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { ITeamMembersInfo } from "../../types";

const CARD_MEDIA_HEIGHT = 250;
const CARD_TITLE_FONTSIZE = 18;
const CARD_DESC_FONTSIZE = 14;
const BUTTON_COLOR = "#F9C152";
const CARD_DESC_MB = 1.5;

interface IPhotoCardPartProps {
  data: ITeamMembersInfo;
}

export default function PhotoCardPart({
  data: { name, image, role, bio, githubLink },
}: IPhotoCardPartProps) {
  return (
    <Box
      component="div"
      sx={{
        width: { md: 1 / 2, xs: 1 },
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignContent: "space-between",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        alt={name as unknown as string}
        height={CARD_MEDIA_HEIGHT}
        image={image}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="h4"
          sx={{ fontSize: CARD_TITLE_FONTSIZE }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: CARD_DESC_MB, fontSize: CARD_DESC_FONTSIZE }}
        >
          {role as unknown as string}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: CARD_DESC_MB, fontSize: CARD_DESC_FONTSIZE }}
        >
          {bio as unknown as string}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", width: "100%" }}>
        <Button
          component="a"
          size="small"
          sx={{ color: BUTTON_COLOR }}
          href={githubLink}
          target="_blank"
        >
          See github
        </Button>
      </CardActions>
    </Box>
  );
}
