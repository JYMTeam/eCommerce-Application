import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAttributes } from "../../store/actions/attributesActions";
import MultipleSelectList from "../MultipleSelect/MultipleSelect";
import { Button } from "@mui/material";
import { filterProducts } from "../../store/actions/productsActions";

export type SelectedFilterValues = { [key: string]: string[] };

export default function ProductsAttributes() {
  const { errorMessage, loading, attributesData } = useAppSelector(
    (state) => state.attributes,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  const [selectedValues, setSelectedValues] = useState<SelectedFilterValues>(
    {},
  );
  const handleListChange = (listName: string, values: string[]) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [listName]: values,
    }));
  };

  const handleSubmitAll = async () => {
    try {
      const nonEmptySelectedValues: SelectedFilterValues = Object.entries(
        selectedValues,
      ).reduce<SelectedFilterValues>((acc, [key, value]) => {
        if (value.length > 0) {
          acc[key] = value;
        }

        return acc;
      }, {});

      if (Object.keys(nonEmptySelectedValues).length === 0) {
        console.log("No data to send");
        return;
      } else {
        dispatch(filterProducts(nonEmptySelectedValues));
      }

      console.log("Data sent successfully");
      console.log(nonEmptySelectedValues);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  if (loading) {
    return <p className="notification-message">Loading attributes...</p>;
  }
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  return (
    <div>
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
      <Button variant="contained" onClick={handleSubmitAll}>
        Filter
      </Button>
    </div>
  );
}
