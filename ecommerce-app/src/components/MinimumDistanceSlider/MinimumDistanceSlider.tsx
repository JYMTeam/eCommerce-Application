import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function valuetext(value: number) {
  return `${value}`;
}

const minDistance = 50;

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = styled(Slider)(({ theme }) => ({
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

type MinimumDistanceSliderProps = {
  value: number[];
  onChange: (newValue: number[]) => void;
};

export default function MinimumDistanceSlider({
  value,
  onChange,
}: MinimumDistanceSliderProps) {
  // const [value, setValue] = React.useState<number[]>([0, 10000]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      const updatedValue = [
        Math.min(newValue[0], value[1] - minDistance),
        value[1],
      ];
      onChange(updatedValue);
      // setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      const updatedValue = [
        value[0],
        Math.max(newValue[1], value[0] + minDistance),
      ];
      onChange(updatedValue);
      // setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography className="slider-header" gutterBottom>
        Price
      </Typography>
      <IOSSlider
        getAriaLabel={() => "Price range"}
        value={value}
        min={0}
        max={2000}
        step={50}
        onChange={handleChange}
        valueLabelDisplay="on"
        size="small"
        getAriaValueText={valuetext}
        disableSwap
        // marks={marks}
      />
      {/* <Slider
        getAriaLabel={() => 'Price range'}
        value={value1}
        min={0}
        step={50}
        max={2000}
        onChange={handleChange1}
        valueLabelDisplay="on"
        size='small'
        getAriaValueText={valuetext}
        disableSwap
      /> */}
    </Box>
  );
}
