import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { parseProducts } from "../../utils/dataParsers";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  CardActionArea,
  Skeleton,
  Chip,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { fetchProducts } from "../../store/actions/productsActions";
import { IParsedProduct } from "../../types";
import { CartProductButtons } from "../CartProductButtons/CartProductButtons";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
export const GRID_SPACING = 2;
const CARD_MIN_HEIGHT = 500;
const CARD_MAX_WIDTH = "100%";
const CARD_BOX_SHADOW = 3;
const CARD_HEIGHT = "100%";
const CARD_MEDIA_HEIGHT = 600;
const CARD_TITLE_FONTSIZE = 18;
const BUTTON_COLOR = "#F9C152";
const CARD_DESC_MB = 1.5;
const PRICE_MR = 1;
const PRICE_BG_COLOR = "rgba(0, 0, 0, 0.08)";
const DISCOUNT_BG_COLOR = "#00ffbb7d";
export const PRODUCT_LIST_PADDING = 3;
const SKELETON_DESC_HEIGHT = 63;
const SKELETON_PRICE_HEIGHT = 30;
SwiperCore.use([EffectFade, Pagination]);
export function MainPageCarousel() {
  const swiperRef = useRef(null);
  const { errorMessage, loading, products } = useAppSelector(
    (state) => state.products,
  );
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const parsedProducts = parseProducts(products);
  const offset = 0;
  const { id: categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchProducts(offset, categoryId));
  }, [dispatch, offset, categoryId]);

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }

  const slides = parsedProducts.map(
    (item: IParsedProduct | undefined, index: number) => {
      return (
        <SwiperSlide key={item ? item.id : index}>
          <Card
            className="main-slide"
            sx={{
              maxWidth: CARD_MAX_WIDTH,
              boxShadow: CARD_BOX_SHADOW,
              minHeight: CARD_MIN_HEIGHT,
              height: CARD_HEIGHT,
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
                <CardContent className="main-slide-item-content">
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
                        onMouseOver={() => setShow(true)}
                        onMouseOut={() => setShow(false)}
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: CARD_DESC_MB,
                          fontSize: CARD_TITLE_FONTSIZE,
                        }}
                      >
                        {show && (item.description as unknown as string)}
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

                  <CardActions>
                    {loading && (
                      <Skeleton width="147px" height="66px"></Skeleton>
                    )}
                    {!loading && parsedProducts.length !== 0 && (
                      <CartProductButtons
                        productArrId={index}
                        sxProps={{ color: BUTTON_COLOR }}
                      />
                    )}
                  </CardActions>
                </CardContent>
              </div>
            </CardActionArea>
          </Card>
        </SwiperSlide>
      );
    },
  );

  const swiperProps = {
    effect: "fade",
    loop: true,
    modules: [EffectFade, Pagination, Autoplay],
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: true,
  };

  return (
    <>
      <Swiper ref={swiperRef} className="mySwiper" {...swiperProps}>
        {slides}
      </Swiper>
    </>
  );
}
