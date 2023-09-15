import React from "react";
import { ITeamMembersInfo } from "../../types";
import { Box } from "@mui/material";

interface IContributionCardPartProps {
  data: ITeamMembersInfo;
}

export default function ContributionCardPart({
  data: { contributionDesc, color },
}: IContributionCardPartProps) {
  return (
    <Box sx={{ width: { md: 1 / 2, xs: 1 }, backgroundColor: color }}>
      Contribution
    </Box>
  );
}
