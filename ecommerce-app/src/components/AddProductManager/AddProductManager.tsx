import React, { useEffect, useState } from "react";
import { Button, SxProps, Theme } from "@mui/material";
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
  const { loading, cart, tokenAnonymData } = useAppSelector(
    (state) => state.cart,
  );
  const { tokenPassData, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );
  const { products } = useAppSelector((state) => state.products);
  const [isAddProduct, setIsAddProduct] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();
  const productQuantity = 1;

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

    if (isAddProduct && cart) {
      addProduct();
      setIsAddProduct(false);
    }
  }, [
    dispatch,
    isLogged,
    isAddProduct,
    setIsAddProduct,
    productArrId,
    cart,
    tokenAnonymData,
    tokenPassData,
    products,
  ]);

  const getOrCreateCart = async () => {
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
          // Если не удалось получить корзину, создаем новую
          await dispatch(fetchCreateCart(currentToken));
          setIsAddProduct(true);
        }
      } else {
        // Создаем новую корзину вместе с получением анонимного токена
        await dispatch(fetchCreateCart());
        setIsAddProduct(true);
      }
    } catch (error) {
      // setErrorMessage("Something went wrong. Try again!");
      console.log("catch => !");
      console.log(error);
    }
  };

  return (
    <>
      <Button
        size="small"
        sx={sxProps}
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          getOrCreateCart();
        }}
      >
        Add to cart
      </Button>
    </>
  );
}
