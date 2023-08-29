import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import ProductsPagination from "../components/ProductsList/ProductsPagination";
import { ProductsPanel } from "../components/ProductsNavigation/ProductsPanel";

export function ShopPage() {
  return (
    <>
      <ProductsPanel />
      <ProductsList />
      <ProductsPagination />
    </>
  );
}
