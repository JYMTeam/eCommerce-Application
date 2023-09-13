import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLoginWithToken } from "../store/actions/userLoginActions";
import { passToken } from "../commercetools-sdk/PassTokenCache/PassTokenCache";

export function TokenManager() {
  const [isTokenVerified, setTokenVerified] = useState(false);
  const { tokenPassData } = useAppSelector((state) => state.userLogin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTokenAndFetchLogin = async () => {
      if (
        !isTokenVerified &&
        tokenPassData &&
        tokenPassData?.refreshToken !== "" &&
        tokenPassData?.refreshToken
      ) {
        console.log("passToken before");
        console.log(passToken);
        await dispatch(fetchLoginWithToken(tokenPassData.refreshToken));
        console.log("passToken after");
        console.log(passToken);
        setTokenVerified(true);
      }
    };

    checkTokenAndFetchLogin();
  }, [dispatch, tokenPassData, isTokenVerified]);

  return <></>;
}
