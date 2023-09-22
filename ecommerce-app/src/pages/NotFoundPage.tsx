import React from "react";
import errorGif from "../assets/error-404.gif";
import { MissingPageTemplate } from "../components/MissingPageTemplate";
export default function NotFoundPage() {
  const pageData = {
    title: "Oops!",
    desc: "We can't find the page you are looking for!",
    img: errorGif,
  };
  return (
    <>
      <MissingPageTemplate
        title={pageData.title}
        desc={pageData.desc}
        img={pageData.img}
        linkTo="/"
        buttonText="Go to Main Page"
      />
    </>
  );
}
