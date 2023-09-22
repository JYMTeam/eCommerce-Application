import React from "react";
import { Typography } from "@mui/material";

interface IHeaderTitle {
  componentType: string;
  text: string;
}

export const HeaderTitle = ({ componentType, text }: IHeaderTitle) => {
  const Component = componentType as keyof JSX.IntrinsicElements;
  return (
    <Typography
      variant="h6"
      component={Component}
      sx={{ textTransform: "uppercase", margin: "1em 0" }}
    >
      {text}
    </Typography>
  );
};
