import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchproductDetails } from "../../store/actions/productDetailsActions";
import { parseProductDetails } from "../../utils/utils";
import { ProductProjection } from "@commercetools/platform-sdk";

export default function ProductDetail(props: object) {
  const { id } = useParams();

  const { errorMessage, loading, product } = useAppSelector(
    (state) => state.productDetails,
  );

  const dispatch = useAppDispatch();
  const parsedProduct = parseProductDetails(product as ProductProjection);
  useEffect(() => {
    dispatch(fetchproductDetails(id as string));
  }, [dispatch, id]);

  console.log(id);
  console.log(parsedProduct);
  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  return (
    <div>
      <p>product details id is</p>
      {id}
    </div>
  );
}
