import React from "react";
// import WorkInProgress from "../components/WorkInProgress";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchAddProductsCart,
  fetchCreateCart,
  fetchGetCart,
} from "../store/actions/cartActions";

export function CartPage() {
  const { cart, tokenAnonymData } = useAppSelector((state) => state.cart);
  const { tokenData, isLogged } = useAppSelector((state) => state.userLogin);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  return (
    <>
      <Button
        onClick={() => {
          dispatch(fetchCreateCart());
        }}
      >
        create cart
      </Button>
      <Button
        onClick={() => {
          if (cart && tokenAnonymData?.token && !isLogged) {
            console.log("anonym Token = fetch getCart!!");
            dispatch(fetchGetCart(tokenAnonymData?.token));
          } else if (tokenData?.token) {
            console.log("pass Token = fetch getCart!!");
            dispatch(fetchGetCart(tokenData?.token));
          } else {
            console.log("no cart created");
          }
        }}
      >
        Get Active Cart
      </Button>
      <Button
        onClick={() => {
          console.log("add first product");
          console.log(cart);
          if (cart) {
            dispatch(fetchAddProductsCart(cart, products[0]));
          } else {
            console.log("no cart created");
          }
        }}
      >
        add first product
      </Button>
    </>
  );
}
