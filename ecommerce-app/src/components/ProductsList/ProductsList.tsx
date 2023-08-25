import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchProducts } from "../../store/actions/productsActions";

export default function ProductsList() {
  const { errorMessage, loading, products, page, limit } = useAppSelector(
    (state) => state.products,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()); //params: page, limit
  }, [dispatch, page, limit]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (errorMessage) {
    return <h1>{errorMessage}</h1>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name["en-US"]}</div>
      ))}
    </div>
  );
}
