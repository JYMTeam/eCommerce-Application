import React, { useEffect } from "react";
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
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, useParams } from "react-router-dom";
import { parseProducts } from "../../utils/dataParsers";
import { SIDEBAR_WIDTH } from "../ProductsSidebar/ProductsSidebar";

const MD_COLS = 4;
const SM_COLS = 6;
const XS_COLS = 12;
const GRID_SPACING = 2;
const CARD_MIN_HEIGHT = 320;
const CARD_MAX_WIDTH = 325;
const CARD_BOX_SHADOW = 3;
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

export default function ProductsList() {
  const { errorMessage, loading, products, page, limit, filterParams } =
    useAppSelector((state) => state.products);
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

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: PRODUCT_LIST_PADDING,
        width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
      }}
    >
      <Grid container spacing={GRID_SPACING}>
        {parsedProducts.map(
          ({ id, name, description, images, price, discount }) => (
            <Grid md={MD_COLS} sm={SM_COLS} xs={XS_COLS} key={id}>
              <Card
                sx={{
                  maxWidth: CARD_MAX_WIDTH,
                  boxShadow: CARD_BOX_SHADOW,
                  minHeight: CARD_MIN_HEIGHT,
                  height: CARD_HEIGHT,
                  ":hover": {
                    boxShadow: 7,
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/product/${id}`}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignContent: "space-between",
                    height: "100%",
                  }}
                >
                  <div>
                    <CardMedia
                      component="img"
                      alt={name as unknown as string}
                      height={CARD_MEDIA_HEIGHT}
                      image={images[0].url}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="h4"
                        sx={{ fontSize: CARD_TITLE_FONTSIZE }}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: CARD_DESC_MB, fontSize: CARD_DESC_FONTSIZE }}
                      >
                        {description as unknown as string}
                      </Typography>
                      <Chip
                        label={discount ? discount : price}
                        size="small"
                        sx={{
                          mr: PRICE_MR,
                          background: discount
                            ? DISCOUNT_BG_COLOR
                            : PRICE_BG_COLOR,
                        }}
                      />
                      <span className="discount">
                        {discount ? price : discount}
                      </span>
                    </CardContent>
                  </div>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: BUTTON_COLOR }}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ),
        )}
      </Grid>
    </Box>
  );
}
