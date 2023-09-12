import React, { ReactNode } from "react";
import { SnackbarProvider, MaterialDesignContent } from "notistack";
import { styled } from "@mui/material";
import { Theme } from "./Theme";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: Theme.palette.primary.main,
  },
}));

export const CustomSnackbarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      Components={{
        success: StyledMaterialDesignContent,
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
