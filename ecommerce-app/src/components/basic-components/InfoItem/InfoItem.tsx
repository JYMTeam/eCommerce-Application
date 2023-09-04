import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const itemStyles = {
  fontSize: "16px",
  lineHeight: "21px",
};

const itemBoxStyles = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "14px 18px",
  borderBottom: "1px solid #e7e7e7",
  minHeight: "60px",
};

interface InfoItemProps {
  label: string;
  value: string;
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Box sx={itemBoxStyles}>
      <Typography
        sx={{
          ...itemStyles,
          fontWeight: "700",
        }}
        variant="caption"
        component="p"
      >
        {label}:
      </Typography>
      <Typography
        sx={{
          ...itemStyles,
          marginBottom: "14px",
        }}
        variant="subtitle1"
        component="p"
      >
        {value}
      </Typography>
    </Box>
  );
}
