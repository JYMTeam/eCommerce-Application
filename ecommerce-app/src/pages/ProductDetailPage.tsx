import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useActions, useAppSelector } from "../hooks/redux";
//  "id": "59bd2cd8-43f7-467d-b2e9-550466935a86",
export default function ProductDetailPage(props: object) {
  const { id } = useParams();
  console.log(id);
  const { product } = useAppSelector((state) => state.productDetail);
  console.log(product);
  const { fetchProductDetail } = useActions();

  useEffect(() => {
    fetchProductDetail("59bd2cd8-43f7-467d-b2e9-550466935a86"); //params: id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>product detail</div>
    </div>
  );
}
