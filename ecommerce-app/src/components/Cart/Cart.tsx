import React, { useEffect, useState } from "react";
// import WorkInProgress from "../components/WorkInProgress";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAddProductsCart,
  fetchCreateCart,
  fetchGetCart,
} from "../../store/actions/cartActions";

export function Cart() {
  const { cart, tokenAnonymData } = useAppSelector((state) => state.cart);
  const { tokenPassData, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );
  const { products } = useAppSelector((state) => state.products);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const dispatch = useAppDispatch();
  const productId = 1;
  const productQuantity = 1;

  useEffect(() => {
    const addProduct = () => {
      if (cart && tokenAnonymData?.token && !isLogged) {
        dispatch(
          fetchAddProductsCart(
            tokenAnonymData?.token,
            cart,
            products[productId],
            productQuantity,
          ),
        );
      } else if (cart && tokenPassData?.token) {
        dispatch(
          fetchAddProductsCart(
            tokenPassData?.token,
            cart,
            products[productId],
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
      console.log("catch => !");
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          getOrCreateCart();
        }}
      >
        add first product
      </Button>
      <Button
        onClick={() => {
          const currentToken = isLogged
            ? tokenPassData?.token
            : tokenAnonymData?.token;
          if (currentToken) {
            dispatch(fetchGetCart(currentToken));
          }
        }}
      >
        get Active Cart
      </Button>{" "}
      --- worked After Adding Product!!!
    </>
  );
}
