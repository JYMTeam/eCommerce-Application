import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPromocode } from "../../store/actions/promocodeActions";
export const Promocode = () => {
  const { errorMessage } = useAppSelector((state) => state.promocodes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromocode());
  }, [dispatch]);

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  return <div>this is promo</div>;
};
