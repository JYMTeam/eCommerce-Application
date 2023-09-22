import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPromocodes } from "../../store/actions/promocodeActions";
import { Button, TextField } from "@mui/material";
import {
  fetchAddPromocodeToCart,
  //fetchRemovePromocodeFromCart,
} from "../../store/actions/cartActions/cartActions";
import {
  DiscountCode,
  DiscountCodePagedQueryResponse,
} from "@commercetools/platform-sdk";
//import { cartSidebarItemSx } from "./CartSidebar/CartSidebar";

export const Promocode = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { promocodes, errorMessage } = useAppSelector(
    (state) => state.promocodes,
  );

  useEffect(() => {
    dispatch(fetchPromocodes());
  }, [dispatch]);
  const [text, setText] = useState("");
  const [appliedPromocodes, setAppliedPromocodes] = useState<DiscountCode[]>(
    [],
  );

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  const getCurrentPromocode = (
    text: string,
    promocodes: DiscountCodePagedQueryResponse,
  ) => {
    const results = promocodes.results;
    return results.filter((result: DiscountCode) => result.code === text);
  };

  const addCurrentPromocode = async () => {
    if (promocodes) {
      const currentPromocode = getCurrentPromocode(text, promocodes);

      await dispatch(fetchPromocodes());
      if (cart && currentPromocode.length > 0) {
        await dispatch(fetchAddPromocodeToCart(cart, currentPromocode[0]));
        if (
          appliedPromocodes.filter(
            (promocode) => promocode.code === currentPromocode[0].code,
          ).length < 1
        ) {
          setAppliedPromocodes([...appliedPromocodes, currentPromocode[0]]);
        }
      } else if (currentPromocode.length === 0) {
        console.log("error");
        if (errorMessage) {
          return <p className="notification-message">{errorMessage}</p>;
        }
      }
    }
  };

  // const removeCurrentPromocode = async () => {
  //   if (promocodes) {
  //     const currentPromocode = getCurrentPromocode(text, promocodes);

  //     await dispatch(fetchPromocodes());
  //     if (cart && currentPromocode.length > 0) {
  //       await dispatch(fetchRemovePromocodeFromCart(cart, currentPromocode[0]));
  //     } else if (currentPromocode.length === 0) {
  //       console.log("error");
  //       if (errorMessage) {
  //         return <p className="notification-message">{errorMessage}</p>;
  //       }
  //     }
  //   }
  // };

  // const showUserPromocodes = async () => {
  //   return (
  //     <Box sx={cartSidebarItemSx}>
  //       <Typography variant="subtitle1" component="p">
  //         {appliedPromocodes.length > 0 ? "Promocodes applied:" : ""}
  //       </Typography>

  //       {appliedPromocodes.map((promocode: DiscountCode, index: number) => (
  //         <Box key={index}>
  //           <Typography variant="subtitle1" component="p">
  //             {promocode.code}
  //           </Typography>
  //           <Button
  //             onClick={removeCurrentPromocode}
  //             type="button"
  //             sx={{ p: "10px" }}
  //             aria-label="apply-promo"
  //           >
  //             Remove
  //           </Button>
  //         </Box>
  //       ))}
  //     </Box>
  //   );
  // };

  return (
    <>
      <TextField
        value={text}
        label="Enter promocode here"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button
        onClick={addCurrentPromocode}
        type="button"
        sx={{ p: "10px" }}
        aria-label="apply-promo"
      >
        Apply
      </Button>
    </>
  );
};
