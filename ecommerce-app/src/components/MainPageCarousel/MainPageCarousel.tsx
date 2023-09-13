import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCategories } from "../../store/actions/categoriesActions";
import { parseCategories, parseProducts } from "../../utils/dataParsers";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  CardActions,
  CardActionArea,
  Skeleton,
  Chip,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../../store/actions/productsActions";
import { IParsedProduct } from "../../types";

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

export function MainPageCarousel() {
  const { errorMessage, loading, products } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const parsedProducts = parseProducts(products);
  console.log(parsedProducts);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const { id: categoryId } = useParams();
  const offset = 0;
  useEffect(() => {
    dispatch(fetchProducts(offset, categoryId));
  }, [dispatch, offset, categoryId]);

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  const parsedCategories = parseCategories(categories);
  parsedCategories.forEach((category) => {
    console.log(category.id);
  });

  type Item = {
    Name: string;
    Caption: string;
    contentPosition: "left" | "right" | "middle";
    Items: IParsedProduct[];
  };

  interface BannerProps {
    item: Item;
    contentPosition: "left" | "right" | "middle";
    length?: number;
  }

  const Banner = (props: BannerProps) => {
    const contentPosition = props.contentPosition
      ? props.contentPosition
      : "left";
    const totalItems: number = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
      <Grid item xs={4} key="content">
        <CardContent className="Content">
          <Typography className="Title">{props.item.Name}</Typography>

          <Typography className="Caption">{props.item.Caption}</Typography>

          <Button variant="outlined" className="ViewButton">
            View Now
          </Button>
        </CardContent>
      </Grid>
    );

    for (let i = 0; i < mediaLength; i++) {
      const item = props.item.Items[i];

      const media = (
        <Grid item xs={4} key={item.name}>
          {/* <CardMedia className="Media" image={item.Image} title={item.Name}>
            <Typography className="MediaCaption">{item.Name}</Typography>
          </CardMedia> */}
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
                  <Skeleton variant="rectangular" height={CARD_MEDIA_HEIGHT} />
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
                <Button
                  size="small"
                  sx={{ color: BUTTON_COLOR }}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  disabled={loading}
                >
                  Add to cart
                </Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>
      );

      items.push(media);
    }

    if (contentPosition === "left") {
      items.unshift(content);
    } else if (contentPosition === "right") {
      items.push(content);
    } else if (contentPosition === "middle") {
      items.splice(items.length / 2, 0, content);
    }

    return (
      <Card raised className="Banner">
        <Grid container spacing={0} className="BannerGrid">
          {items}
        </Grid>
      </Card>
    );
  };

  const items: Item[] = [
    {
      Name: `parsedCategories[0].text`,
      Caption: "City vibes in your hands!",
      contentPosition: "left",
      Items: parsedProducts,
    },
    {
      Name: `parsedCategories[1].text`,
      Caption: "Say no to boring suitcases!",
      contentPosition: "middle",
      Items: parsedProducts,
    },
    {
      Name: `parsedCategories[2].text`,
      Caption: "Go nature with style!",
      contentPosition: "right",
      Items: parsedProducts,
    },
  ];
  return (
    <div style={{ marginTop: "50px", color: "#494949" }}>
      <Carousel className="main-carousel">
        {items.map((item, index) => {
          return (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
