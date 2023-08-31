import "./Search.css";
import React, { useEffect, useState, useRef } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useAppDispatch } from "../../../hooks/redux";
import {
  fetchProducts,
  searchProducts,
} from "../../../store/actions/productsActions";

const SearchComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleClearInput = () => {
    setSearchValue("");
    dispatch(fetchProducts());
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);

    if (inputValue.length >= 3) {
      dispatch(searchProducts(inputValue));
    } else {
      dispatch(fetchProducts());
    }
  };

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="search-panel">
      {isSearchOpen && (
        <Box className="search-panel__input">
          <TextField
            label="Search..."
            variant="standard"
            fullWidth
            id="standard-search"
            size="small"
            value={searchValue}
            onChange={handleSearchInputChange}
            inputRef={inputRef}
            InputProps={{
              endAdornment: searchValue && (
                <IconButton
                  onClick={handleClearInput}
                  style={{ color: "#343454" }}
                  size="small"
                  sx={{
                    ":hover": {
                      bgcolor: "transparent",
                      color: "primary.dark",
                    },
                  }}
                >
                  <Clear />
                </IconButton>
              ),
            }}
          />
        </Box>
      )}

      <IconButton
        className="search-panel__button"
        onClick={toggleSearch}
        color="primary"
        aria-label="search"
        sx={{
          ":hover": {
            bgcolor: "transparent",
            color: "primary.dark",
          },
        }}
      >
        <Search />
      </IconButton>
    </div>
  );
};

export default SearchComponent;
