import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchCheckCartAndRemoveAll } from "../../../store/actions/cartActions/cartRemoveActions";

export const CartRemoveAllButton = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClickRemoveAll = () => {
    setOpen(false);
    if (cart) {
      dispatch(fetchCheckCartAndRemoveAll(cart));
    }
  };

  const buttonSx = {
    ":hover": {
      bgcolor: "transparent",
      color: "primary.dark",
    },
  };

  return (
    <>
      <Button variant="text" sx={buttonSx} onClick={handleClickOpen}>
        Empty&nbsp;Cart
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Cart Empty"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to completely empty your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={buttonSx} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={buttonSx} onClick={handleOnClickRemoveAll} autoFocus>
            Empty Cart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
