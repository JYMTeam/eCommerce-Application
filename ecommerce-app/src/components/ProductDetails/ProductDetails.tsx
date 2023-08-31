import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProductDetails } from "../../store/actions/productDetailsActions";
import { parseProducts } from "../../utils/dataParsers";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { IParcedProduct } from "../../types";

const MD_COLS = 6;
const SM_COLS = 12;
const GRID_SPACING = 2;
const IMG_HEIGHT = "auto";
const IMG_WIDTH = "100%";
const PRODUCT_TITLE_FONTSIZE = "2em";
const PRODUCT_DESC_FONTSIZE = "1em";
const PRODUCT_PRICE_FONTSIZE = "1.4em";
const PRODUCT_DESC_MARGIN = 3;

export default function ProductDetail() {
  const { id } = useParams();
  const { errorMessage, loading, product } = useAppSelector(
    (state) => state.productDetails,
  );

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

  let parsedProduct: IParcedProduct[] = [];
  if (product) {
    parsedProduct = parseProducts([product]);
  }
  console.log(product);
  console.log(parsedProduct[0].images);

  return (
    <div>
      {parsedProduct.map(({ id, name, description, images, price }) => (
        <Grid container spacing={GRID_SPACING} key={id}>
          <Grid
            item
            md={MD_COLS}
            sm={SM_COLS}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paper
              component={Stack}
              direction="column"
              elevation={0}
              justifyContent="center"
              sx={{
                width: { IMG_WIDTH },
                height: { IMG_HEIGHT },
                overflow: "hidden",
              }}
            >
              <img
                className="product-img"
                src={images[0].url}
                alt={name as unknown as string}
              />
            </Paper>
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
              {description as unknown as string}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: PRODUCT_DESC_MARGIN,
                mb: PRODUCT_DESC_MARGIN,
                fontSize: PRODUCT_PRICE_FONTSIZE,
              }}
            >
              {price}
            </Typography>
            <Button variant="outlined">Add to Cart</Button>
          </Grid>
        </Grid>
      ))}
    </div>
  );
}
