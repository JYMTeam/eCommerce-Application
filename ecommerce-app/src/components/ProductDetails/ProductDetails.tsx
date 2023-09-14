import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProductDetails } from "../../store/actions/productDetailsActions";
import { parseProducts } from "../../utils/dataParsers";
import { Grid, Typography, Chip } from "@mui/material";
import { IParsedProduct } from "../../types";
import { ProductCarousel } from "../ProductCarousel/ProductCarousel";
import { CartProductButtons } from "../CartProductButtons/CartProductButtons";
const MD_COLS = 6;
const SM_COLS = 12;
const GRID_SPACING = 2;
const PRODUCT_TITLE_FONTSIZE = "2em";
const PRODUCT_DESC_FONTSIZE = "1em";
const PRODUCT_DESC_MARGIN = 3;
const BUTTON_COLOR = "#F9C152";
const PRICE_MR = 1;
const PRICE_BG_COLOR = "rgba(0, 0, 0, 0.08)";
const DISCOUNT_BG_COLOR = "#00ffbb7d";
const BUTTON_ML = 2;

export default function ProductDetail() {
  const { id } = useParams();
  const { errorMessage, loading, product } = useAppSelector(
    (state) => state.productDetails,
  );

  const { products } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  let parsedProduct: IParsedProduct[] = [];
  let productArrId: number | null;

  if (product) {
    parsedProduct = parseProducts([product]);
  }

  if (product && products && products.length !== 0) {
    productArrId = products.findIndex((element) => element.id === product.id);
  }
  return (
    <div>
      {parsedProduct.map(
        ({
          id,
          name,
          longDescription,
          images,
          price,
          discount,
          designer,
          sizeList,
          color,
        }) => (
          <Grid
            container
            spacing={GRID_SPACING}
            key={id}
            pt={5}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              md={MD_COLS}
              sm={SM_COLS}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProductCarousel images={images} />
            </Grid>
            <Grid
              item
              md={MD_COLS}
              sm={SM_COLS}
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                },
              }}
            >
              <Typography
                gutterBottom
                variant="h3"
                component="h3"
                sx={{ fontSize: PRODUCT_TITLE_FONTSIZE }}
              >
                {name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: PRODUCT_DESC_MARGIN,
                  mb: PRODUCT_DESC_MARGIN,
                  fontSize: PRODUCT_DESC_FONTSIZE,
                }}
              >
                {longDescription as unknown as string}
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  mt: PRODUCT_DESC_MARGIN,
                  mb: PRODUCT_DESC_MARGIN,
                  fontSize: PRODUCT_DESC_FONTSIZE,
                }}
              >
                Designer: {designer.slice(1, -1)}
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  mt: PRODUCT_DESC_MARGIN,
                  mb: PRODUCT_DESC_MARGIN,
                  fontSize: PRODUCT_DESC_FONTSIZE,
                }}
              >
                Color: {color.slice(1, -1)}
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{
                  mt: PRODUCT_DESC_MARGIN,
                  mb: PRODUCT_DESC_MARGIN,
                  fontSize: PRODUCT_DESC_FONTSIZE,
                }}
              >
                Size: {sizeList.slice(1, -1)}
              </Typography>

              <Chip
                label={discount ? discount : price}
                size="small"
                sx={{
                  mr: PRICE_MR,
                  background: discount ? DISCOUNT_BG_COLOR : PRICE_BG_COLOR,
                }}
              />
              <span className="discount">{discount ? price : discount}</span>
              {!loading &&
                products.length !== 0 &&
                productArrId !== null &&
                productArrId !== -1 && (
                  <CartProductButtons
                    productArrId={productArrId}
                    sxProps={{ ml: BUTTON_ML, color: BUTTON_COLOR }}
                  />
                )}
            </Grid>
          </Grid>
        ),
      )}
    </div>
  );
}
