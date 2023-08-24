import React, { useEffect } from "react";
import { useActions, useAppSelector } from "../../hooks/redux";

export default function ProductsList() {
  const { errorMessage, loading, products, page } = useAppSelector(
    (state) => state.products,
  );

  const { fetchProducts } = useActions();

  useEffect(() => {
    fetchProducts(); //params: page, limit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
