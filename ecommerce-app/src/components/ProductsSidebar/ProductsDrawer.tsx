import React from "react";
import { SIDEBAR_WIDTH } from "./ProductsSidebar";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { IProductsDrawerProps } from "../../types";
import CategoriesList from "./CategoriesList";

export default function ProductsDrawer({
  mobileOpen,
  onCategoriesIconClick,
}: IProductsDrawerProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="categories links"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCategoriesIconClick}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        {<CategoriesList />}
      </Drawer>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        {<CategoriesList />}
      </Box>
    </Box>
  );
}
