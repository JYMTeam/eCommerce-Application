import React, { useEffect, useState } from "react";
import "./products-panel.css";
import { Badge, Box, Button, Drawer } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductsAttributes from "./ProductsAttributes";
import { useAppSelector } from "../../hooks/redux";

export const ProductsPanel = () => {
  const [open, setOpen] = useState(false);
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
      <Box className="filter-button">
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
            onClick={() => setOpen(true)}
          >
            Filter & Sort
          </Button>
        </Badge>
      </Box>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div onClick={() => setOpen(false)} role="button" tabIndex={0}>
          <IconButton>
            <CloseIcon color="primary" fontSize="medium" />
          </IconButton>
        </div>
        <ProductsAttributes />
      </Drawer>
    </>
  );
};
