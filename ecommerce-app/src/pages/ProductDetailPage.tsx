import { useParams } from "react-router-dom";
import { useActions, useAppSelector } from "../hooks/redux";
import { useEffect } from "react";
import { parseProducts } from "../utils/utils";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { ProductProjection } from "@commercetools/platform-sdk";

//  "id": "59bd2cd8-43f7-467d-b2e9-550466935a86",
const MD_COLS = 6;
const SM_COLS = 12;
const GRID_SPACING = 2;
const IMG_HEIGHT = "auto";
const IMG_WIDTH = "100%";
const PROUCT_TITLE_FONTSIZE = "2em";
const CARD_DESC_FONTSIZE = "1em";
const CARD_PRICE_FONTSIZE = "1.4em";

const DESC_MARGIN = 3;
export default function ProductDetailPage(props: object) {
  const { id } = useParams();
  const { product } = useAppSelector((state) => state.productDetail);
  const parsedProduct = parseProducts([product as ProductProjection]);
  console.log(parsedProduct);
  const { fetchProductDetail } = useActions();
  useEffect(() => {
    fetchProductDetail(id as string); //params: id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                mt: DESC_MARGIN,
                mb: DESC_MARGIN,
                fontSize: CARD_DESC_FONTSIZE,
              }}
            >
              {description as unknown as string}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                mt: DESC_MARGIN,
                mb: DESC_MARGIN,
                fontSize: CARD_PRICE_FONTSIZE,
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
