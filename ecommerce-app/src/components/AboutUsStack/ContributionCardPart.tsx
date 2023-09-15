import React from "react";
import { ITeamMembersInfo } from "../../types";
import { Box } from "@mui/material";

interface IContributionCardPartProps {
  data: ITeamMembersInfo;
  index: number;
}

export default function ContributionCardPart({
  data: { contributionDesc, color },
  index,
}: IContributionCardPartProps) {
  return (
    <Box
      sx={{
        width: { md: 1 / 2, xs: 1 },
        borderLeft: index % 2 === 0 ? `black 1px solid` : 0,
        borderRight: index % 2 === 0 ? 0 : `black 1px solid`,
        backgroundColor: color,
      }}
    >
      Contribution
    </Box>
  );
}
