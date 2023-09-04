import Carousel from "react-material-ui-carousel";
import { Paper, Stack, Box, Modal } from "@mui/material";
import { Image } from "@commercetools/platform-sdk";
import React, { useState } from "react";

const HEIGHT = "auto";
const WIDTH = "100%";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ProductCarousel(props: { images: Image[] }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function Item(props: { image: Image; i: number }) {
    // console.log(props.i);
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
          onClick={handleOpen}
          width={WIDTH}
          className="product-img"
          src={props.image.url}
          alt={props.image.label as unknown as string}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img
              onClick={handleOpen}
              width={WIDTH}
              className="product-img"
              src={props.image.url}
              alt={props.image.label as unknown as string}
            />
          </Box>
        </Modal>
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
        <Item key={i} image={image} i={i} />
      ))}
    </Carousel>
  );
}
