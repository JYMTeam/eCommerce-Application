import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const SELECT_WIDTH = 200;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: SELECT_WIDTH,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface ISelectBasicProps {
  placeholder: string;
  elements: string[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
}

export default function MultipleSelectList(props: ISelectBasicProps) {
  const theme = useTheme();
  const { selectedValues, onChange } = props;

  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: SELECT_WIDTH }}>
        <InputLabel id={props.placeholder}>{props.placeholder}</InputLabel>
        <Select
          labelId={props.placeholder}
          id={props.placeholder}
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={props.placeholder} />}
          MenuProps={MenuProps}
        >
          {props.elements.map((element) => (
            <MenuItem
              key={element}
              value={element}
              style={getStyles(element, selectedValues, theme)}
            >
              {element}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
