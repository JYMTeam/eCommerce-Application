import React from "react";
import emptyCartGif from "../../../assets/empty-cart.gif";
import { MissingPageTemplate } from "../../MissingPageTemplate";

export const CartEmpty = () => {
  const pageData = {
    title: "Empty Cart",
    desc: "Your cart is currently empty. Start shopping now!",
    img: emptyCartGif,
  };
  return (
    <>
      <MissingPageTemplate
        title={pageData.title}
        desc={pageData.desc}
        img={pageData.img}
        linkTo="/shop"
        buttonText="Go to shop"
      />
    </>
  );
};
