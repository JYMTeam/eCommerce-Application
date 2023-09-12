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
    };

    checkTokenAndFetchLogin();
  }, [dispatch, tokenPassData, isTokenVerified]);

  return <></>;
}
