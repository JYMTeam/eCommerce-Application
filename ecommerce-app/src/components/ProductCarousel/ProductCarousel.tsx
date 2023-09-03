import Carousel from "react-material-ui-carousel";
import { Paper, Stack } from "@mui/material";
import { Image } from "@commercetools/platform-sdk";
const HEIGHT = "auto";
const WIDTH = "100%";

export function ProductCarousel(props: { images: Image[] }) {
  function Item(props: { image: Image }) {
    return (
      <Paper
        component={Stack}
        direction="column"
        elevation={0}
        justifyContent="center"
        sx={{
          width: { WIDTH },
          height: { HEIGHT },
          overflow: "hidden",
        }}
      >
        <img
          width={WIDTH}
          className="product-img"
          src={props.image.url}
          alt={props.image.label as unknown as string}
        />
      </Paper>
    );
  }
  return (
    <Carousel
      sx={{ width: WIDTH }}
      indicators={props.images.length > 1 ? true : false}
      navButtonsAlwaysVisible={true}
      navButtonsAlwaysInvisible={props.images.length > 1 ? false : true}
    >
      {props.images.map((image, i) => (
        <Item key={i} image={image} />
      ))}
    </Carousel>
  );
}
