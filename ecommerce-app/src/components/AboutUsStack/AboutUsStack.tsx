import React from "react";
import Stack from "@mui/material/Stack";
import { teamMembersInfo } from "../../constants/constants";
import { Card } from "@mui/material";
import PhotoCardPart from "./PhotoCardPart";
import ContributionCardPart from "./ContributionCardPart";

const CARD_MAX_WIDTH = 425;

export default function AboutUsStack() {
  return (
    <Stack direction={{ sm: "column" }} spacing={{ sm: 2 }} sx={{ mb: 2 }}>
      {teamMembersInfo.map((teamInfo, index) => {
        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              boxShadow: 3,
              width: { md: "100%", xs: CARD_MAX_WIDTH },
            }}
          >
            {index % 2 === 0 ? (
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
