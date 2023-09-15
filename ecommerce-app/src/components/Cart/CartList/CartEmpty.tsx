import React from "react";
import errorGif from "../../../assets/error-404.gif";
import { MissingPageTemplate } from "../../MissingPageTemplate";

export const CartEmpty = () => {
  const pageData = {
    title: "Empty Cart",
    desc: "Your cart is currently empty. Start shopping now!",
    img: errorGif,
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
