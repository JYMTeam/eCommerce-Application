import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import ProductsPagination from "../components/ProductsList/ProductsPagination";

export function ShopPage() {
  return (
    <>
      <ProductsList />
      <ProductsPagination />
    </>
  );
}
