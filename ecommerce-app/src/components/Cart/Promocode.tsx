import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPromocode } from "../../store/actions/promocodeActions";
import { Button, TextField } from "@mui/material";
export const Promocode = () => {
  const { errorMessage } = useAppSelector((state) => state.promocodes);
  const dispatch = useAppDispatch();
  const discountId = "1c47cebb-b591-4ca4-94af-c6776475f41e";
  useEffect(() => {
    dispatch(fetchPromocode(discountId));
  }, [dispatch]);
  const [text, setText] = useState("");
  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  const addApplyHandler = async () => {
    await dispatch(fetchPromocode(text));
    console.log(text);
  };

  return (
    <div>
      <TextField
        value={text}
        label="Enter promocode here"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        onClick={addApplyHandler}
        type="button"
        sx={{ p: "10px" }}
        aria-label="apply-promo"
      >
        Apply
      </Button>
    </div>
  );
};
