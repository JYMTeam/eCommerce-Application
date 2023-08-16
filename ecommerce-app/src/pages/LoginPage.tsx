import React from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

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
      <Box sx={{ pt: "2em" }}>
        <Link className="redirect-link" to="/registration" color="primary">
          Not yet a member? Register here!
        </Link>
      </Box>
    </Container>
  );
}
