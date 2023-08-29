import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CURRENCY_SIGN } from "../../../utils/utils";
import { DEFAULT_CURRENCY } from "../../../constants/constants";

function valuetext(value: number) {
  return `${value}`;
}

const SLIDER_MIN_DISTANCE = 50;
const SLIDER_STEP = 50;
const SLIDER_WIDTH = 200;
const SLIDER_THUMB_SIZE = 15;
const SLIDER_MARK_WIDTH = 1;
const SLIDER_MARK_HEIGHT = 8;
const SLIDER_TOP_MARK_DISTANCE = 5;
const SLIDER_PADDING = "15px 0";

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = styled(Slider)(({ theme }) => ({
  height: 2,
  padding: SLIDER_PADDING,
  "& .MuiSlider-thumb": {
    height: SLIDER_THUMB_SIZE,
    width: SLIDER_THUMB_SIZE,
    backgroundColor: "primary",
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
    fontWeight: "normal",
    top: SLIDER_TOP_MARK_DISTANCE,
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
    height: SLIDER_MARK_HEIGHT,
    width: SLIDER_MARK_WIDTH,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

type MinimumDistanceSliderProps = {
  value: number[];
  onChange: (newValue: number[]) => void;
  min: number;
  max: number;
};

export default function MinimumDistanceSlider({
  value,
  onChange,
  min = 0,
  max = 2000,
}: MinimumDistanceSliderProps) {
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
        Math.min(newValue[0], value[1] - SLIDER_MIN_DISTANCE),
        value[1],
      ];
      onChange(updatedValue);
    } else {
      const updatedValue = [
        value[0],
        Math.max(newValue[1], value[0] + SLIDER_MIN_DISTANCE),
      ];
      onChange(updatedValue);
    }
  };

  return (
    <Box sx={{ width: SLIDER_WIDTH }}>
      <Typography variant="body2" className="slider-header" gutterBottom>
        PRICE, {CURRENCY_SIGN[DEFAULT_CURRENCY as keyof typeof CURRENCY_SIGN]}
      </Typography>
      <IOSSlider
        getAriaLabel={() => "Price range"}
        value={value}
        min={min}
        max={max}
        step={SLIDER_STEP}
        onChange={handleChange}
        valueLabelDisplay="on"
        size="small"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
