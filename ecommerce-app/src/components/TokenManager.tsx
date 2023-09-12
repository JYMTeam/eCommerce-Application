import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLoginWithToken } from "../store/actions/userLoginActions";

export function TokenManager() {
  const [isTokenVerified, setTokenVerified] = useState(false);
  const { tokenPassData } = useAppSelector((state) => state.userLogin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTokenAndFetchLogin = () => {
      if (!isTokenVerified && tokenPassData && tokenPassData?.token !== "") {
        dispatch(fetchLoginWithToken(tokenPassData));
        setTokenVerified(true);
      }
      // else if (!isTokenAnonymVerified && tokenAnonymData && tokenAnonymData?.token !== "") {
      //   console.log('------token manager anonym------');
      //   // dispatch(fetchGetCart(tokenAnonymData?.token));
      //   setTokenAnonymVerified(true);
      // }
    };

    checkTokenAndFetchLogin();
  }, [dispatch, tokenPassData, isTokenVerified]);

  return <></>;
}
