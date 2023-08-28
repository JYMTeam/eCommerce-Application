import "./productDetail.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useActions, useAppSelector } from "../../hooks/redux";

export default function ProductDetail(props: object) {
  const { id } = useParams();
  console.log(id);
  const { product } = useAppSelector((state) => state.productDetail);
  console.log(product);
  const { fetchProductDetail } = useActions();

  useEffect(() => {
    fetchProductDetail(id as string); //params: id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div>product detail {id}</div>
    </div>
  );
}
