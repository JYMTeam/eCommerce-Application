import React, { useEffect, useState } from "react";
import "./ProductsPanel.css";
import { Badge, Box, Button, Drawer } from "@mui/material";
import { IconButton } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import ProductsFilters from "./ProductsFilters";
import { useAppSelector } from "../../hooks/redux";
import SearchComponent from "./ProductsSearchPanel/ProductsSearchPanel";
import { IProductsPanelProps } from "../../types";

export const ProductsPanel = ({
  onCategoriesIconClick,
}: IProductsPanelProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const { filterParams } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (filterParams) {
      setIsFilter(true);
    } else {
      setIsFilter(false);
    }
  }, [filterParams]);
  return (
    <>
      <Box className="products-panel">
        <IconButton
          color="primary"
          aria-label="open sidevar drawer"
          edge="start"
          onClick={onCategoriesIconClick}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <CategoryIcon />
        </IconButton>
        <SearchComponent />
        <Badge
          color="secondary"
          badgeContent=" "
          variant="dot"
          invisible={!isFilter}
        >
          <Button
            variant="text"
            sx={{
              ":hover": {
                bgcolor: "transparent",
                color: "primary.dark",
              },
            }}
            onClick={() => setOpenFilter(true)}
          >
            Filter & Sort
          </Button>
        </Badge>
      </Box>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <div onClick={() => setOpenFilter(false)} role="button" tabIndex={0}>
          <IconButton>
            <CloseIcon color="primary" fontSize="medium" />
          </IconButton>
        </div>
        <ProductsFilters />
      </Drawer>
    </>
  );
};
