import React from "react";
import { ProductsPanel } from "../ProductsPanel/ProductsPanel";
import ProductsList from "../ProductsList/ProductsList";
import ProductsPagination from "../ProductsList/ProductsPagination";
import ProductsDrawer from "./ProductsDrawer";
import { Box } from "@mui/material";
import CategoriesBreadcrumbs from "./CategoriesBreadcrumb";

export const SIDEBAR_WIDTH = 240;

export default function ProductsSidebar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleSidebarToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <ProductsPanel onCategoriesIconClick={handleSidebarToggle} />
      <CategoriesBreadcrumbs />
      <Box sx={{ display: "flex" }} component="main">
        <ProductsDrawer
          mobileOpen={mobileOpen}
          onCategoriesIconClick={handleSidebarToggle}
        />
        <ProductsList />
      </Box>
      <ProductsPagination />
    </>
  );
}
