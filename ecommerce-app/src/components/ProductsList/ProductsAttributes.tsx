import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAttributes } from "../../store/actions/attributesActions";
import MultipleSelectList from "../MultipleSelect/MultipleSelect";
import { Button } from "@mui/material";

type SelectedValues = { [key: string]: string[] };

export default function ProductsAttributes() {
  const { errorMessage, loading, attributesData } = useAppSelector(
    (state) => state.attributes,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAttributes());
  }, [dispatch]);

  const [selectedValues, setSelectedValues] = useState<SelectedValues>({});
  const handleListChange = (listName: string, values: string[]) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [listName]: values,
    }));
  };

  const handleSubmitAll = async () => {
    try {
      const nonEmptySelectedValues: SelectedValues = Object.entries(
        selectedValues,
      ).reduce<SelectedValues>((acc, [key, value]) => {
        if (value.length > 0) {
          acc[key] = value;
        }

        return acc;
      }, {});

      if (Object.keys(nonEmptySelectedValues).length === 0) {
        console.log("No data to send");
        return;
      }

      // await dispatch(sendSelectedValues(selectedValues));
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
