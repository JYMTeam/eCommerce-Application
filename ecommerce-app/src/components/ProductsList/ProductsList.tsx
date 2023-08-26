import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "../../store/actions/productsActions";
import { parseProducts } from "../../utils/utils";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

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
    return <h2>Loading...</h2>;
  }
  if (errorMessage) {
    return <h2>{errorMessage}</h2>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        {parsedProducts.map(({ id, name, description, image, price }) => (
          <Grid md={3} sm={6} xs={12} key={id}>
            <Card
              sx={{
                maxWidth: 325,
                boxShadow: 3,
                minHeight: 320,
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                ":hover": {
                  boxShadow: 7,
                },
              }}
            >
              <CardMedia
                component="img"
                alt={name as unknown as string}
                height="250"
                image={image.url}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h4"
                  sx={{ fontSize: 18 }}
                >
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5, fontSize: 14 }}
                >
                  {description as unknown as string}
                </Typography>
                <Chip label={price} size="small" />
              </CardContent>
              <CardActions>
                <Button size="small" sx={{ color: "#F9C152" }}>
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
