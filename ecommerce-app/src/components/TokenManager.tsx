import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLoginWithToken } from "../store/actions/userLoginActions";
import {
  anonymTokenCache,
  passToken,
} from "../commercetools-sdk/PassTokenCache/PassTokenCache";
import { clientBuilderManager } from "../commercetools-sdk/builders/ClientbuilderManager";

export function TokenManager() {
  const [isPassTokenVerified, setPassTokenVerified] = useState(false);
  const [isAnonymTokenVerified, setAnonymTokenVerified] = useState(false);
  const { tokenPassData } = useAppSelector((state) => state.userLogin);
  const { tokenAnonymData } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkPassTokenAndFetchLogin = async () => {
      if (
        !isPassTokenVerified &&
        tokenPassData &&
        tokenPassData?.refreshToken !== "" &&
        tokenPassData?.refreshToken
      ) {
        console.log("passToken before");
        console.log(passToken);
        await dispatch(fetchLoginWithToken(tokenPassData.refreshToken));
        console.log("passToken after");
        console.log(passToken);
        setPassTokenVerified(true);
      }
    };

    const checkAnonymTokenAndFetchLogin = async () => {
      if (
        !isAnonymTokenVerified &&
        tokenAnonymData &&
        tokenAnonymData?.refreshToken !== "" &&
        tokenAnonymData?.refreshToken
      ) {
        console.log("anonymToken before");
        console.log(anonymTokenCache);
        clientBuilderManager.switchToRefreshTokenFlow(
          tokenAnonymData.refreshToken,
        );
        // dispatch(fetchGetOrCreateCart(tokenAnonymData.refreshToken));
        // await dispatch(fetchLoginWithToken(tokenAnonymData.refreshToken));
        console.log("anonymToken after");
        console.log(anonymTokenCache);
        setAnonymTokenVerified(true);
      }
    };

    checkPassTokenAndFetchLogin();
    checkAnonymTokenAndFetchLogin();
  }, [
    dispatch,
    tokenPassData,
    tokenAnonymData,
    isPassTokenVerified,
    isAnonymTokenVerified,
  ]);

  return <></>;
}
