import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAttributes } from "../../store/actions/attributesActions";
import MultipleSelectList from "../MultipleSelect/MultipleSelect";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import {
  resetFilterParams,
  setFilterParams,
} from "../../store/actions/productsActions";
import MinimumDistanceSlider from "../MinimumDistanceSlider/MinimumDistanceSlider";

const MIN_SLIDER_VALUE = 0;
const MAX_SLIDER_VALUE = 1000;

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

  const handleListChange = (listName: string, values: string[]) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [listName]: values,
    }));
  };

  const handleSubmitAll = async () => {
    try {
      const nonEmptySelectedValues: SelectedFilterValues =
        getNonEmptySelectedValues(selectedValues);
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
    setSliderValue([MIN_SLIDER_VALUE, MAX_SLIDER_VALUE]);
    dispatch(resetFilterParams());
  };

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  return (
    <div className="filter-box">
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
      </Box>
      <Box className="filter-box__bottom">
        <Box className="filter-box__slider">
          <MinimumDistanceSlider
            value={sliderValue}
            onChange={setSliderValue}
            min={MIN_SLIDER_VALUE}
            max={MAX_SLIDER_VALUE}
          />
        </Box>
        <Box className="filter-box__buttons">
          <Button
            className="filter-box__button"
            variant="contained"
            onClick={handleSubmitAll}
          >
            Filter
          </Button>
          {filterParams && (
            <Button
              className="filter-box__button"
              variant="contained"
              onClick={handleResetFilters}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
}

const getNonEmptySelectedValues = (selectedValues: SelectedFilterValues) => {
  return Object.entries(selectedValues).reduce<SelectedFilterValues>(
    (acc, [key, value]) => {
      if (value.length > 0) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
};
