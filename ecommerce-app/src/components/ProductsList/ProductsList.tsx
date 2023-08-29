import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "../../store/actions/productsActions";
import { parseProducts } from "../../utils/utils";
import {
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
import { Link } from "react-router-dom";

const MD_COLS = 3;
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

export default function ProductsList() {
  const { errorMessage, loading, products, page, limit } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  const parsedProducts = parseProducts(products);
  const offset = limit * (page - 1);

  useEffect(() => {
    dispatch(fetchProducts(offset));
  }, [dispatch, offset]);

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  return (
    <div>
      <Grid container spacing={GRID_SPACING}>
        {parsedProducts.map(({ id, name, description, image, price }) => (
          <Grid md={MD_COLS} sm={SM_COLS} xs={XS_COLS} key={id}>
            <Card
              sx={{
                maxWidth: CARD_MAX_WIDTH,
                boxShadow: CARD_BOX_SHADOW,
                minHeight: CARD_MIN_HEIGHT,
                height: CARD_HEIGHT,
                display: "flex",
                flexWrap: "wrap",
                ":hover": {
                  boxShadow: 7,
                },
              }}
            >
              <CardActionArea component={Link} to={`/shop/${id}`}>
                <CardMedia
                  component="img"
                  alt={name as unknown as string}
                  height={CARD_MEDIA_HEIGHT}
                  image={image.url}
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
                  <Chip label={price} size="small" />
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ color: BUTTON_COLOR }}>
                    Learn More
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
