import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import Container from "@mui/material/Container";

export function RegistrationPage() {
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
