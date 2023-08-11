import React, { useEffect } from "react";
import { fetchUserLogin } from "../store/actions/userLoginActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";

const existingUser: UserAuthOptions = {
  username: "johndoe@example.com",
  password: "secret123",
};

export function LoginPage() {
  const dispatch = useAppDispatch();

  //получаем данные из стейта
  const { error, loading, loginData } = useAppSelector(
    (state) => state.userLogin,
  );

  useEffect(() => {
    dispatch(fetchUserLogin(existingUser));
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {loginData && <p>Customer = {loginData.email} is logged!</p>}
    </div>
  );
}
