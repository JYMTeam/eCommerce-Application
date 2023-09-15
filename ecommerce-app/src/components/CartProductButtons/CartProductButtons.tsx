import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Theme as MuiTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchGetOrCreateCart,
  fetchAddProductsCart,
} from "../../store/actions/cartActions/cartActions";
import { fetchCheckCartAndRemoveProduct } from "../../store/actions/cartActions/cartRemoveActions";
import { Theme } from "../Theme";
import { NOT_FOUND_MESSAGE } from "../../commercetools-sdk/errors/errors";

export interface IAddProductButtonProps {
  productArrId: number;
  sxProps?: SxProps<MuiTheme>;
}

export function CartProductButtons({
  productArrId,
  sxProps,
}: IAddProductButtonProps) {
  const { cart, tokenAnonymData, errorMessage } = useAppSelector(
    (state) => state.cart,
  );
  const { tokenPassData, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );
  const { products } = useAppSelector((state) => state.products);
  const productsLoading = useAppSelector((state) => state.products.loading);

  const [isAddProduct, setIsAddProduct] = useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const dispatch = useAppDispatch();
  const productQuantity = 1;

  const buttonsBoxSx = {
    m: 1,
    position: "relative",
    maxWidth: "fit-content",
  };

  const buttonSx = {
    ...sxProps,
    ":hover": {
      bgcolor: "transparent",
      color: "primary.main",
    },
  };

  const circularProgressSx = {
    color: Theme.palette.primary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px",
  };

  useEffect(() => {
    const addProduct = () => {
      if (cart && tokenAnonymData?.refreshToken && !isLogged) {
        dispatch(
          fetchAddProductsCart(cart, products[productArrId], productQuantity),
        );
      } else if (cart && tokenPassData?.refreshToken) {
        dispatch(
          fetchAddProductsCart(cart, products[productArrId], productQuantity),
        );
      }
    };

    const setButtonsStatus = () => {
      if (
        products &&
        products.length !== 0 &&
        cart &&
        cart.lineItems.length !== 0
      ) {
        const isInCart = cart.lineItems.find(
          (element) => element.productId === products[productArrId].id,
        );
        if (isInCart) setSuccess(true);
      } else {
        setSuccess(false);
      }

      if (errorMessage && errorMessage !== NOT_FOUND_MESSAGE) {
        setSuccess(false);
        setIsAddProduct(false);
      }
    };

    if (isAddProduct && cart) {
      addProduct();
      setIsAddProduct(false);
    }

    setButtonsStatus();
  }, [
    dispatch,
    isLogged,
    isAddProduct,
    setSuccess,
    setIsAddProduct,
    productArrId,
    cart,
    tokenAnonymData,
    tokenPassData,
    products,
    errorMessage,
  ]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const clearAnimation = () => {
    if (!loadingButton) {
      setSuccess(false);
      setLoadingButton(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoadingButton(false);

        if (errorMessage && errorMessage !== NOT_FOUND_MESSAGE) {
          setSuccess(false);
          setIsAddProduct(false);
        }
      }, 600);
    }
  };

  const addButtonHandler = async () => {
    clearAnimation();
    const currentToken = isLogged
      ? tokenPassData?.refreshToken
      : tokenAnonymData?.refreshToken;
    await dispatch(fetchGetOrCreateCart(currentToken));
    setIsAddProduct(true);
  };

  const removeHandlerClick = async () => {
    const currentToken = isLogged
      ? tokenPassData?.token
      : tokenAnonymData?.token;
    const lineItem = cart?.lineItems.find(
      (item) => item.productId === products[productArrId].id,
    );

    if (currentToken && lineItem && cart) {
      await dispatch(fetchCheckCartAndRemoveProduct(cart, lineItem.id));
      setSuccess(false);
    }
  };

  return (
    <Box sx={buttonsBoxSx}>
      <Button
        size="small"
        variant="text"
        color="secondary"
        sx={buttonSx}
        disabled={loadingButton || success || productsLoading}
        onClick={(e) => {
          e.preventDefault();
          addButtonHandler();
        }}
      >
        {!success && "Add to cart"}
        {success && "Added"}
      </Button>
      {loadingButton && <CircularProgress size={24} sx={circularProgressSx} />}
      {success && (
        <Button
          size="small"
          variant="text"
          color="secondary"
          sx={buttonSx}
          disabled={loadingButton || productsLoading}
          onClick={(e) => {
            e.preventDefault();
            removeHandlerClick();
          }}
        >
          Remove
        </Button>
      )}
    </Box>
  );
}
