import React, { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import ProductsPagination from "../components/ProductsList/ProductsPagination";
import { useAppDispatch } from "../hooks/redux";
import { fetchFilterProducts } from "../store/actions/filterProductsActions";

export function ShopPage() {
  //check token after loading
  const [isFiltered, setFiltered] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filtration = () => {
      if (!isFiltered) {
        dispatch(fetchFilterProducts());
        setFiltered(true);
      }
    };
    filtration();
  }, [dispatch, setFiltered, isFiltered]);
  return (
    <>
      <ProductsList />
      <ProductsPagination />
    </>
  );
}
