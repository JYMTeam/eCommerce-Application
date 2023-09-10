import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, SxProps, Theme } from "@mui/material";
import { green } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAddProductsCart,
  fetchCreateCart,
  fetchGetCart,
} from "../../store/actions/cartActions";

export interface IAddProductButtonProps {
  productArrId: number;
  sxProps?: SxProps<Theme>;
}

export function AddProductManager({
  productArrId,
  sxProps,
}: IAddProductButtonProps) {
  const { cart, tokenAnonymData } = useAppSelector((state) => state.cart);
  const { tokenPassData, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );
  const { products } = useAppSelector((state) => state.products);
  const [isAddProduct, setIsAddProduct] = useState(false);

  const [loadingButton, setLoadingButton] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  const dispatch = useAppDispatch();
  const productQuantity = 1;

  const buttonSx = {
    ...sxProps,
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

    if (cart) {
      const isInCart = cart.lineItems.find(
        (element) => element.productId === products[productArrId].id,
      );
      if (isInCart) setSuccess(true);
    }

    if (isAddProduct && cart) {
      addProduct();
      setIsAddProduct(false);
    }
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
  ]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const getOrCreateCart = async () => {
    if (!loadingButton) {
      setSuccess(false);
      setLoadingButton(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoadingButton(false);
      }, 600);
    }
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
      console.log("");
    }
  };

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Button
        size="small"
        sx={buttonSx}
        disabled={loadingButton || success}
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
    </Box>
  );
}
