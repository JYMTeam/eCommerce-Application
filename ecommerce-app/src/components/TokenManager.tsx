import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchLoginWithToken } from "../store/actions/userActions/userLoginActions";
import { clientBuilderManager } from "../commercetools-sdk/builders/ClientBuilderManager1";

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
        await dispatch(fetchLoginWithToken(tokenPassData.refreshToken));
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
        clientBuilderManager.switchToRefreshTokenFlow(
          tokenAnonymData.refreshToken,
        );
        // dispatch(fetchGetOrCreateCart(tokenAnonymData.refreshToken));
        // await dispatch(fetchLoginWithToken(tokenAnonymData.refreshToken));
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
