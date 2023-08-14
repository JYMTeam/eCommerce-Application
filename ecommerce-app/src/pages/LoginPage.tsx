import { LoginForm } from "../components/LoginForm/LoginForm";
import Container from "@mui/material/Container";

export function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ mb: 3 }} className="container">
      <h1>Account login</h1>
      <LoginForm></LoginForm>
    </Container>
  );
}
