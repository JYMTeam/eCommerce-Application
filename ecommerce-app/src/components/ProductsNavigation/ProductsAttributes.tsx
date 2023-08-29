import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAttributes } from "../../store/actions/attributesActions";
import MultipleSelectList from "../basic-components/MultipleSelect/MultipleSelect";
import IconButton from "@mui/material/IconButton";
import FilterOffIcon from "@mui/icons-material/FilterAltOff";

import Box from "@mui/material/Box";
import {
  resetFilterParams,
  setFilterParams,
} from "../../store/actions/productsActions";
import MinimumDistanceSlider from "../basic-components/MinimumDistanceSlider/MinimumDistanceSlider";
import BasicSelect from "../basic-components/BasicSelect/BasicSelect";
import { Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { SortMethods } from "../../types";

const MIN_SLIDER_VALUE = 0;
const MAX_SLIDER_VALUE = 1000;
const sortAttributes = {
  name: "sort",
  values: [SortMethods.PRICE_HIGH, SortMethods.PRICE_LOW, SortMethods.NAME],
};

export type SelectedFilterValues = { [key: string]: string[] };

export default function ProductsAttributes() {
  const { errorMessage, attributesData } = useAppSelector(
    (state) => state.attributes,
  );

  const { filterParams } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  const [selectedValues, setSelectedValues] = useState<SelectedFilterValues>(
    {},
  );
  const [sliderValue, setSliderValue] = useState<number[]>([
    MIN_SLIDER_VALUE,
    MAX_SLIDER_VALUE,
  ]);

  const [selectSortValue, setSelectSortValue] = useState("");

  const handleListChange = (listName: string, values: string[]) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [listName]: values,
    }));
  };

  const handleSubmitAll = async () => {
    try {
      const nonEmptySelectedValues: SelectedFilterValues =
        getNonEmptySelectedValues(selectedValues, selectSortValue);
      const updatedFilterParams = {
        ...nonEmptySelectedValues,
        price: sliderValue.map(String),
      };
      dispatch(setFilterParams(updatedFilterParams));
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleResetFilters = async () => {
    setSelectedValues({});
    setSelectSortValue("");
    setSliderValue([MIN_SLIDER_VALUE, MAX_SLIDER_VALUE]);
    dispatch(resetFilterParams());
  };

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  return (
    <div className="filter-box">
      <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
        FILTER & SORT
      </Typography>
      <BasicSelect
        placeholder={sortAttributes.name}
        elements={sortAttributes.values}
        selectedValue={selectSortValue}
        onChange={setSelectSortValue}
      />
      <Divider className="filter-box__divider" variant="middle" />
      <Box className="filter-box__lists">
        {attributesData.map((attribute) => {
          if (attribute.values.length !== 0) {
            return (
              <MultipleSelectList
                key={attribute.name}
                placeholder={attribute.name}
                elements={attribute.values}
                selectedValues={selectedValues[attribute.name] || []}
                onChange={(values) => handleListChange(attribute.name, values)}
              />
            );
          }
          return null;
        })}
        <Box className="filter-box__slider">
          <MinimumDistanceSlider
            value={sliderValue}
            onChange={setSliderValue}
            min={MIN_SLIDER_VALUE}
            max={MAX_SLIDER_VALUE}
          />
        </Box>
      </Box>
      <Box className="filter-box__buttons">
        <Button aria-label="Filter" title="Filter" onClick={handleSubmitAll}>
          Show results
        </Button>
        {filterParams && (
          <IconButton
            aria-label="FilterOff"
            title="FilterOff"
            onClick={handleResetFilters}
          >
            <FilterOffIcon color="primary" />
          </IconButton>
        )}
      </Box>
    </div>
  );
}

const getNonEmptySelectedValues = (
  selectedValues: SelectedFilterValues,
  sortValue: string,
) => {
  const nonEmptySelectedValues = Object.entries(
    selectedValues,
  ).reduce<SelectedFilterValues>((acc, [key, value]) => {
    if (value.length > 0) {
      acc[key] = value;
    }
    return acc;
  }, {});

  if (sortValue !== "") {
    nonEmptySelectedValues[sortAttributes.name] = [sortValue];
  }

  return nonEmptySelectedValues;
};
