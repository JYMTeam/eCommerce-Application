import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import ProductsPagination from "../components/ProductsList/ProductsPagination";
import ProductsAttributes from "../components/ProductsList/ProductsAttributes";

export function ShopPage() {
  return (
    <>
      <ProductsAttributes />
      <ProductsList />
      <ProductsPagination />
    </>
  );
}
