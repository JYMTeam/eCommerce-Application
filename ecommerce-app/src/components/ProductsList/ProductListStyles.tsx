import { Box, Button, Theme, SxProps } from "@mui/material";
import { SIDEBAR_WIDTH } from "../ProductsSidebar/ProductsSidebar";
import { styled } from "@mui/system";

export const CARD_DESC_MB = 1.5;
export const PRODUCT_LIST_PADDING = 3;

const CARD_MIN_HEIGHT = 320;
const CARD_MAX_WIDTH = 325;
const CARD_HEIGHT = "100%";

const CARD_TITLE_FONTSIZE = 18;
const CARD_TITLE_MIN_HEIGHT = "45px";

const CARD_DESC_FONTSIZE = 14;
const CARD_BORDER_COLOR = "#dbd8d8";

const CARD_CONTENT_BG_COLOR = "#ffffffe6";
const CARD_CONTENT_HEADER_OFFSET = "68px";

const CIRCLE_BUTTON_SIZE = "35px";
const CIRCLE_BUTTON_BOTTOM = "75px";
const CIRCLE_BUTTON_BG_COLOR = "rgba(134, 134, 134, 0.5)";

export const ProductListBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  p: PRODUCT_LIST_PADDING,
  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  },
  display: "flex",
  justifyContent: "center",
}));

export const CardOuterBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  transition: "box-shadow 0.3s ease",
  "@media (hover: hover)": {
    "&:hover": {
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
      "& .card-content": {
        transform: "translateY(-55%)",
      },
    },
  },
}));

export const CardContentBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: `calc(100% - ${CARD_CONTENT_HEADER_OFFSET})`,
  height: "100%",
  width: "100%",
  background: CARD_CONTENT_BG_COLOR,
  transform: "translateY(0%)",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  "&.panel-open": {
    transform: "translateY(-55%)",
  },
}));

export const CircleButton = styled(Button)({
  position: "absolute",
  display: "none",
  bottom: CIRCLE_BUTTON_BOTTOM,
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: CIRCLE_BUTTON_BG_COLOR,
  color: "white",
  borderRadius: "50%",
  width: CIRCLE_BUTTON_SIZE,
  height: CIRCLE_BUTTON_SIZE,
  textAlign: "center",
  minWidth: "auto",

  "@media (hover: none)": {
    display: "block",
  },
});

export const cardSx: SxProps<Theme> = {
  maxWidth: CARD_MAX_WIDTH,
  boxShadow: 0,
  minHeight: CARD_MIN_HEIGHT,
  height: CARD_HEIGHT,
  width: "100%",
  border: `1px solid ${CARD_BORDER_COLOR}`,
  borderRadius: 0,
  transition: "box-shadow 0.3s ease",
};

export const cardActionAreaSx: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignContent: "space-between",
  height: "100%",
  width: "100%",
};

export const cardTitleSx: SxProps<Theme> = {
  fontSize: CARD_TITLE_FONTSIZE,
  minHeight: CARD_TITLE_MIN_HEIGHT,
  textTransform: "capitalize",
};

export const cardDescSx: SxProps<Theme> = {
  mb: CARD_DESC_MB,
  fontSize: CARD_DESC_FONTSIZE,
};

export const cardMediaSx: SxProps<Theme> = {
  height: "100%",
};
