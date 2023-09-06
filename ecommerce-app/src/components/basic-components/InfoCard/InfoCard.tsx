import React from "react";
import Paper from "@mui/material/Paper";
import { InfoItem } from "../InfoItem/InfoItem";

interface Info {
  label: string;
  value: string;
}

export interface InfoCardProps {
  infoData: Info[];
}

export function InfoCard({ infoData }: InfoCardProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexWrap: "wrap",
        border: "1px solid #e7e7e7",
        borderRadius: "4px",
      }}
    >
      {infoData.map((item) => (
        <InfoItem key={item.label} label={item.label} value={item.value} />
      ))}
    </Paper>
  );
}
