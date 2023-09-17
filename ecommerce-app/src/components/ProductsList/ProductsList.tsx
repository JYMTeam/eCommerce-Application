import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProducts,
  filterAndSortProducts,
} from "../../store/actions/productsActions";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Skeleton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, useParams } from "react-router-dom";
import { parseProducts } from "../../utils/dataParsers";
import { SIDEBAR_WIDTH } from "../ProductsSidebar/ProductsSidebar";
import { ProductCartButtons } from "../ProductCartButtons/ProductCartButtons";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";
import { IParsedProduct } from "../../types";
import { styled } from "@mui/system";

const MD_COLS = 4;
const SM_COLS = 6;
const XS_COLS = 12;
export const GRID_SPACING = 2;
const CARD_MIN_HEIGHT = 320;
const CARD_MAX_WIDTH = 325;
const CARD_HEIGHT = "100%";
const CARD_MEDIA_HEIGHT = 250;
const CARD_TITLE_FONTSIZE = 18;
const CARD_DESC_FONTSIZE = 14;
const BUTTON_COLOR = "#F9C152";
const CARD_DESC_MB = 1.5;
const PRICE_MR = 1;
const PRICE_BG_COLOR = "rgba(0, 0, 0, 0.08)";
const DISCOUNT_BG_COLOR = "#00ffbb7d";
export const PRODUCT_LIST_PADDING = 3;
const SKELETON_DESC_HEIGHT = 63;
const SKELETON_PRICE_HEIGHT = 30;

const OuterBox = styled(Box)(({ theme }) => ({
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

const CardContentBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% - 68px)",
  height: "100%",
  width: "100%",
  background: "#ffffffe6",
  transform: "translateY(0%)",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  "&.panel-open": {
    transform: "translateY(-55%)",
  },
}));

const CircleButton = styled(Button)({
  position: "absolute",
  display: "none",
  bottom: "75px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "rgba(134, 134, 134, 0.5)",
  color: "white",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  textAlign: "center",
  minWidth: "auto",

  "@media (hover: none)": {
    display: "block",
  },
});

export default function ProductsList() {
  const { errorMessage, loading, products, page, limit, filterParams } =
    useAppSelector((state) => state.products);

  const [openPanels, setOpenPanels] = useState<boolean[]>([]);

  const dispatch = useAppDispatch();
  const parsedProducts = parseProducts(products);
  const offset = limit * (page - 1);
  const { id: categoryId } = useParams();

  useEffect(() => {
    if (filterParams) {
      dispatch(filterAndSortProducts(filterParams, offset, categoryId));
    } else {
      dispatch(fetchProducts(offset, categoryId));
    }
  }, [dispatch, offset, filterParams, categoryId]);

  const togglePanel = (index: number) => {
    const newOpenPanels = new Array(parsedProducts.length).fill(false);
    newOpenPanels[index] = !newOpenPanels[index];
    setOpenPanels(newOpenPanels);
  };

  const closeAllPanels = () => {
    setOpenPanels(new Array(parsedProducts.length).fill(false));
    console.log("all panels");
  };

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: PRODUCT_LIST_PADDING,
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        display: "flex",
        justifyContent: "center",
      }}
      onClick={closeAllPanels}
    >
      <Grid container spacing={GRID_SPACING}>
        {(loading
          ? Array.from(new Array(DEFAULT_PRODUCTS_LIMIT))
          : parsedProducts
        ).map((item: IParsedProduct | undefined, index: number) => (
          <Grid
            md={MD_COLS}
            sm={SM_COLS}
            xs={XS_COLS}
            key={item ? item.id : index}
          >
            <Card
              sx={{
                maxWidth: CARD_MAX_WIDTH,
                boxShadow: 0,
                minHeight: CARD_MIN_HEIGHT,
                height: CARD_HEIGHT,
                border: "1px solid #dbd8d8",
                borderRadius: 0,
                transition: "box-shadow 0.3s ease",
              }}
            >
              <CardActionArea
                component={Link}
                to={`/product/${item ? item.id : ""}`}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignContent: "space-between",
                  height: "100%",
                  position: "relative",
                }}
              >
                <OuterBox>
                  {item ? (
                    <CardMedia
                      component="img"
                      alt={item.name as unknown as string}
                      height={CARD_MEDIA_HEIGHT}
                      image={item.images[0].url}
                      sx={{
                        height: "100%",
                      }}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      height={CARD_MEDIA_HEIGHT}
                    />
                  )}
                  {item ? (
                    <CircleButton
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        togglePanel(index);
                        console.log("Button clicked");
                      }}
                    >
                      +
                    </CircleButton>
                  ) : (
                    <></>
                  )}
                  {item ? (
                    <CardContentBox
                      className={`card-content ${
                        openPanels[index] ? "panel-open" : ""
                      }`}
                    >
                      <CardContent sx={{ padding: "6%" }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h4"
                          sx={{
                            fontSize: CARD_TITLE_FONTSIZE,
                            minHeight: "45px",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: CARD_DESC_MB,
                            fontSize: CARD_DESC_FONTSIZE,
                          }}
                        >
                          {item.description as unknown as string}
                        </Typography>
                        <Chip
                          label={item.discount ? item.discount : item.price}
                          size="small"
                          sx={{
                            mr: PRICE_MR,
                            background: item.discount
                              ? DISCOUNT_BG_COLOR
                              : PRICE_BG_COLOR,
                          }}
                        />
                        <span className="discount">
                          {item.discount ? item.price : item.discount}
                        </span>
                      </CardContent>
                      <CardActions>
                        {loading && (
                          <Skeleton width="147px" height="66px"></Skeleton>
                        )}
                        {!loading && parsedProducts.length !== 0 && (
                          <ProductCartButtons
                            productArrId={index}
                            sxProps={{ color: BUTTON_COLOR }}
                          />
                        )}
                      </CardActions>
                    </CardContentBox>
                  ) : (
                    <CardContent>
                      <Skeleton width="100%" />
                      <Skeleton
                        sx={{ mb: CARD_DESC_MB }}
                        width="100%"
                        height={SKELETON_DESC_HEIGHT}
                      />
                      <Skeleton width="30%" height={SKELETON_PRICE_HEIGHT} />
                    </CardContent>
                  )}
                </OuterBox>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
