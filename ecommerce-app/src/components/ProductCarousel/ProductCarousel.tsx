import Carousel from "react-material-ui-carousel";
import { Paper, Stack, Box, Modal, IconButton } from "@mui/material";
import { Image } from "@commercetools/platform-sdk";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./productCarousel.css";

const HEIGHT = "400px";
const WIDTH = "400px";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
};

export function ProductCarousel(props: { images: Image[] }) {
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          objectFit: "contain",
        }}
      >
        <img
          onClick={() => {
            handleOpen();
            setCurrentUrl(props.image.url);
          }}
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
          <>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={style}>
              <img
                onClick={handleOpen}
                width={WIDTH}
                className="modal-img"
                src={currentUrl}
                alt={props.image.label as unknown as string}
              />
            </Box>
          </>
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
        <Item key={i} image={image} />
      ))}
    </Carousel>
  );
}
