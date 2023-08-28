import "./productDetail.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { parseProducts } from "../../utils/utils";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { ProductProjection } from "@commercetools/platform-sdk";
import { fetchProductDetail } from "../../store/actions/productDetailActions";
const MD_COLS = 6;
const SM_COLS = 12;
const GRID_SPACING = 2;
const IMG_HEIGHT = "auto";
const IMG_WIDTH = "100%";
const PROUCT_TITLE_FONTSIZE = "2em";
const PROUCT_DESC_FONTSIZE = "1em";
const PROUCT_PRICE_FONTSIZE = "1.4em";
const PROUCT_DESC_MARGIN = 3;
export default function ProductDetail(props: object) {
  const { id } = useParams();
  const { errorMessage, loading, product } = useAppSelector(
    (state) => state.productDetail,
  );
  const dispatch = useAppDispatch();
  const parsedProduct = parseProducts([product as ProductProjection]);

  useEffect(() => {
    dispatch(fetchProductDetail(id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  return (
    <div>
      {parsedProduct.map(({ id, name, description, image, price }) => (
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
                src={image.url}
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
              sx={{ fontSize: PROUCT_TITLE_FONTSIZE }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: PROUCT_DESC_MARGIN,
                mb: PROUCT_DESC_MARGIN,
                fontSize: PROUCT_DESC_FONTSIZE,
              }}
            >
              {description as unknown as string}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: PROUCT_DESC_MARGIN,
                mb: PROUCT_DESC_MARGIN,
                fontSize: PROUCT_PRICE_FONTSIZE,
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
