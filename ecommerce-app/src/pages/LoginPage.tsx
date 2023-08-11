import React, { useEffect } from "react";
import { fetchUserLogin } from "../store/actions/userLoginActions";
import { useAppDispatch } from "../hooks/redux";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";
import { LoginForm } from "../components/LoginForm/LoginForm";
import Container from "@mui/material/Container";

const existingUser: UserAuthOptions = {
  username: "johndoe@example.com",
  password: "secret123",
};

export function LoginPage() {
  const dispatch = useAppDispatch();

  // const { error, loading, loginData } = useAppSelector(
  //   (state) => state.userLogin,
  // );

  useEffect(() => {
    dispatch(fetchUserLogin(existingUser));
  }, [dispatch]);

  return (
    <Container maxWidth="xs" sx={{ mb: 3 }} className="container">
      <h1>Account login</h1>
      <LoginForm></LoginForm>
    </Container>
  );
}
