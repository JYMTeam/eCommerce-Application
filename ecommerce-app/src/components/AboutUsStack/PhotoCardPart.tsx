import React from "react";
import { Box, CardMedia } from "@mui/material";
import { ITeamMembersInfo } from "../../types";

const CARD_MEDIA_HEIGHT = 250;

interface IPhotoCardPartProps {
  data: ITeamMembersInfo;
}

export default function PhotoCardPart({
  data: { name, image },
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
        sx={{
          minHeight: {
            xs: "auto",
            sm: "450px",
            md: "450px",
          },
        }}
      />
    </Box>
  );
}
