import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Theme as MuiTheme,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAddProductsCart,
  fetchCreateCart,
  fetchGetCart,
  fetchRemoveProductFromCart,
} from "../../store/actions/cartActions";

export interface IAddProductButtonProps {
  productArrId: number;
  sxProps?: SxProps<MuiTheme>;
}

const ERROR_GET_CART = "404: Sorry, resource not found";

export function CartProductManager({
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

  const buttonSx = {
    ...sxProps,
    ":hover": {
      bgcolor: "transparent",
      color: "primary.main",
    },
  };

  useEffect(() => {
    const addProduct = () => {
      if (cart && tokenAnonymData?.token && !isLogged) {
        dispatch(
          fetchAddProductsCart(
            tokenAnonymData?.token,
            cart,
            products[productArrId],
            productQuantity,
          ),
        );
      } else if (cart && tokenPassData?.token) {
        dispatch(
          fetchAddProductsCart(
            tokenPassData?.token,
            cart,
            products[productArrId],
            productQuantity,
          ),
        );
      }
    };

    const setButtonsStatus = () => {
      if (cart && cart.lineItems.length !== 0) {
        const isInCart = cart.lineItems.find(
          (element) => element.productId === products[productArrId].id,
        );
        if (isInCart) setSuccess(true);
      } else {
        setSuccess(false);
      }

      if (errorMessage && errorMessage !== "404: Sorry, resource not found") {
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

        if (errorMessage && errorMessage !== ERROR_GET_CART) {
          setSuccess(false);
          setIsAddProduct(false);
        }
      }, 600);
    }
  };

  const getOrCreateCart = async () => {
    clearAnimation();

    if (cart) {
      setIsAddProduct(true);
      return;
    }

    const currentToken = isLogged
      ? tokenPassData?.token
      : tokenAnonymData?.token;

    try {
      if (currentToken) {
        try {
          await dispatch(fetchGetCart(currentToken));
          setIsAddProduct(true);
        } catch (error) {
          // If we couldn't get the cart, create a new one
          await dispatch(fetchCreateCart(currentToken));
          setIsAddProduct(true);
        }
      } else {
        // We create a new cart along with receiving an anonymous token
        await dispatch(fetchCreateCart());
        setIsAddProduct(true);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const removeHandlerClick = () => {
    const currentToken = isLogged
      ? tokenPassData?.token
      : tokenAnonymData?.token;
    const lineItem = cart?.lineItems.find(
      (item) => item.productId === products[productArrId].id,
    );

    if (currentToken && lineItem && cart) {
      dispatch(fetchRemoveProductFromCart(currentToken, cart, lineItem.id));
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ m: 1, position: "relative", maxWidth: "fit-content" }}>
      <Button
        size="small"
        variant="text"
        color="secondary"
        sx={buttonSx}
        disabled={loadingButton || success || productsLoading}
        onClick={(e) => {
          e.preventDefault();
          getOrCreateCart();
        }}
      >
        {!success && "Add to cart"}
        {success && "Added"}
      </Button>
      {loadingButton && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
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
