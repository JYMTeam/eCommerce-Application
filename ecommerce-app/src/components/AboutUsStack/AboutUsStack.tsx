import React from "react";
import Stack from "@mui/material/Stack";
import { teamMembersInfo } from "../../constants/constants";
import { Card, useMediaQuery } from "@mui/material";
import { Theme } from "../Theme";
import PhotoCardPart from "./PhotoCardPart";
import ContributionCardPart from "./ContributionCardPart";

export default function AboutUsStack() {
  const isMobile = useMediaQuery(Theme.breakpoints.down("md"));
  return (
    <Stack
      direction={{ sm: "column" }}
      sx={{ mb: 2, border: "1px solid #e7e7e7" }}
    >
      {teamMembersInfo.map((teamInfo, index) => {
        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column-reverse" },
              borderRadius: 0,
              boxShadow: 0,
              margin: 0,
              width: {
                sm: "100%",
                md: "100%",
              },
            }}
          >
            {index % 2 === 0 && !isMobile ? (
              <>
                <PhotoCardPart data={teamInfo}></PhotoCardPart>
                <ContributionCardPart data={teamInfo} />
              </>
            ) : (
              <>
                <ContributionCardPart data={teamInfo} />
                <PhotoCardPart data={teamInfo}></PhotoCardPart>
              </>
            )}
          </Card>
        );
      })}
    </Stack>
  );
}
