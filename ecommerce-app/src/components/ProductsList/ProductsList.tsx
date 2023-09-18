import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchProducts,
  filterAndSortProducts,
} from "../../store/actions/productsActions";
import {
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
import { ProductCartButtons } from "../ProductCartButtons/ProductCartButtons";
import { DEFAULT_PRODUCTS_LIMIT } from "../../constants/constants";
import { IParsedProduct } from "../../types";
import {
  CARD_DESC_MB,
  CardContentBox,
  CardOuterBox,
  CircleButton,
  ProductListBox,
  cardActionAreaSx,
  cardDescSx,
  cardMediaSx,
  cardSx,
  cardTitleSx,
} from "./ProductListStyles";

export const GRID_SPACING = 2;
const MD_COLS = 4;
const SM_COLS = 6;
const XS_COLS = 12;
const CARD_MEDIA_HEIGHT = 250;
const PRICE_MR = 1;
const PRICE_BG_COLOR = "rgba(0, 0, 0, 0.08)";
const DISCOUNT_BG_COLOR = "#00ffbb7d";
const SKELETON_DESC_HEIGHT = 63;
const SKELETON_PRICE_HEIGHT = 30;
const CARD_CONTENT_PADDING = "6%";
const BUTTON_COLOR = "#F9C152";

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
  };

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  return (
    <ProductListBox onClick={closeAllPanels}>
      <Grid container spacing={GRID_SPACING} sx={{ width: "100%" }}>
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
            <Card sx={cardSx}>
              <CardActionArea
                component={Link}
                to={`/product/${item ? item.id : ""}`}
                sx={cardActionAreaSx}
              >
                <CardOuterBox>
                  {item ? (
                    <CardMedia
                      component="img"
                      alt={item.name as unknown as string}
                      height={CARD_MEDIA_HEIGHT}
                      image={item.images[0].url}
                      sx={cardMediaSx}
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
                      <CardContent sx={{ padding: CARD_CONTENT_PADDING }}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h4"
                          sx={cardTitleSx}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={cardDescSx}
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
                </CardOuterBox>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ProductListBox>
  );
}
