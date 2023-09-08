import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
// import { fetchLoginWithToken } from "../store/actions/userLoginActions";
// import { fetchGetCart } from "../store/actions/cartActions";

export function TokenManager() {
  // const [isTokenVerified, setTokenVerified] = useState(false);
  // const [isTokenAnonymVerified, setTokenAnonymVerified] = useState(false);
  const { tokenData } = useAppSelector((state) => state.userLogin);
  // const { tokenAnonymData } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkTokenAndFetchLogin = () => {
      // if (!isTokenVerified && tokenData && tokenData?.token !== "") {
      //   console.log('------token manager login------');
      //   dispatch(fetchLoginWithToken(tokenData));
      //   setTokenVerified(true);
      // } else if (!isTokenAnonymVerified && tokenAnonymData && tokenAnonymData?.token !== "") {
      //   console.log('------token manager anonym------');
      //   dispatch(fetchGetCart(tokenAnonymData?.token));
      //   setTokenAnonymVerified(true);
      // }
    };

    checkTokenAndFetchLogin();
  }, [
    dispatch,
    tokenData,
    // isTokenVerified,
  ]);

  return <></>;
}
