import React from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import Container from "@mui/material/Container";

export function LoginPage() {
  // const dispatch = useAppDispatch();

  // const { error, loading, loginData } = useAppSelector(
  //   (state) => state.userLogin,
  // );

  // useEffect(() => {
  //   dispatch(fetchUserLogin(existingUser));
  // }, [dispatch]);

  return (
    <Container maxWidth="xs" sx={{ mb: 3 }} className="container">
      <h1>Account login</h1>
      <LoginForm></LoginForm>
    </Container>
  );
}
