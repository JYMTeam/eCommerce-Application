import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./BasicSelect.css";

interface IBasicSelectProps {
  placeholder: string;
  elements: string[];
  selectedValue: string;
  onChange: (selectedValue: string) => void;
}
const SELECT_MIN_WIDTH = 200;

export default function BasicSelect(props: IBasicSelectProps) {
  const { selectedValue, onChange } = props;
  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: SELECT_MIN_WIDTH }}>
      <FormControl fullWidth>
        <InputLabel id={props.placeholder}>{props.placeholder}</InputLabel>
        <Select
          labelId={props.placeholder}
          id={props.placeholder}
          value={selectedValue}
          label={props.placeholder}
          onChange={handleChange}
        >
          {props.elements.map((element) => (
            <MenuItem
              key={element}
              value={element}
              classes={{
                root:
                  element === selectedValue
                    ? "selectedMenuItem"
                    : "unselectedMenuItem",
              }}
            >
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
