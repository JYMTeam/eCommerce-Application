import React, { useState } from "react";
import "./products-panel.css";
import { Box, Button, Drawer } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductsAttributes from "./ProductsAttributes";

export const ProductsPanel = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box className="filter-button">
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
