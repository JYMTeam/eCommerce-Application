import { RegistrationForm } from "../components/SignupForm/SignupForm";
import Container from "@mui/material/Container";

export function SignupPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ height: 1 / 1, pb: 5 }}
      className="container"
    >
      <h1>Register here</h1>
      <RegistrationForm></RegistrationForm>
    </Container>
  );
}
