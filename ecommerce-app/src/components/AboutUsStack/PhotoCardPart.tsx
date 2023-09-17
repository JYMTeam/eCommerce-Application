import React from "react";
import { Box, CardMedia } from "@mui/material";
import { ITeamMembersInfo } from "../../types";

const CARD_MEDIA_HEIGHT = 250;

const wrapperBoxSx = {
  width: { md: 1 / 2, xs: 1 },
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignContent: "space-between",
  height: "100%",
};
const cardMediaSx = {
  minHeight: {
    xs: "auto",
    sm: "450px",
    md: "450px",
  },
};
interface IPhotoCardPartProps {
  data: ITeamMembersInfo;
}

export default function PhotoCardPart({
  data: { name, image },
}: IPhotoCardPartProps) {
  return (
    <Box component="div" sx={wrapperBoxSx}>
      <CardMedia
        component="img"
        alt={name as unknown as string}
        height={CARD_MEDIA_HEIGHT}
        image={image}
        sx={cardMediaSx}
      />
    </Box>
  );
}
