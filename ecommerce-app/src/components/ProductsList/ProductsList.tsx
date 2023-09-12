import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProducts,
  filterAndSortProducts,
} from "../../store/actions/productsActions";
import {
  Box,
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
import { CartProductManager } from "../CartProductManager/CartProductManager";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";
import { IParsedProduct } from "../../types";

const MD_COLS = 4;
const SM_COLS = 6;
const XS_COLS = 12;
export const GRID_SPACING = 2;
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
const SKELETON_DESC_HEIGHT = 63;
const SKELETON_PRICE_HEIGHT = 30;

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
                to={`/product/${item ? item.id : ""}`}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  alignContent: "space-between",
                  height: "100%",
                }}
              >
                <div style={{ width: "100%" }}>
                  {item ? (
                    <CardMedia
                      component="img"
                      alt={item.name as unknown as string}
                      height={CARD_MEDIA_HEIGHT}
                      image={item.images[0].url}
                    />
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      height={CARD_MEDIA_HEIGHT}
                    />
                  )}
                  {item ? (
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="h4"
                        sx={{ fontSize: CARD_TITLE_FONTSIZE }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: CARD_DESC_MB, fontSize: CARD_DESC_FONTSIZE }}
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
                </div>
                <CardActions>
                  {loading && <Skeleton width="147px" height="66px"></Skeleton>}
                  {!loading && parsedProducts.length !== 0 && (
                    <CartProductManager
                      productArrId={index}
                      sxProps={{ color: BUTTON_COLOR }}
                    />
                  )}
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
