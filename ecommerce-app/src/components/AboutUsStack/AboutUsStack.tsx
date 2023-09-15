import React from "react";
import Stack from "@mui/material/Stack";
import { teamMembersInfo } from "../../constants/constants";
import { Card } from "@mui/material";
import PhotoCardPart from "./PhotoCardPart";
import ContributionCardPart from "./ContributionCardPart";

const CARD_MAX_WIDTH = 425;
const BORDER_WIDTH = 2;

export default function AboutUsStack() {
  return (
    <Stack direction={{ sm: "column" }}>
      {teamMembersInfo.map((teamInfo, index) => {
        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              borderRadius: 0,
              border: `black 1px solid`,
              width: {
                md: `calc(100% - ${BORDER_WIDTH}px)`,
                xs: CARD_MAX_WIDTH,
              },
            }}
          >
            {index % 2 === 0 ? (
              <>
                <PhotoCardPart data={teamInfo}></PhotoCardPart>
                <ContributionCardPart data={teamInfo} index={index} />
              </>
            ) : (
              <>
                <ContributionCardPart data={teamInfo} index={index} />
                <PhotoCardPart data={teamInfo}></PhotoCardPart>
              </>
            )}
          </Card>
        );
      })}
    </Stack>
  );
}
