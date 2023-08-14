import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import Container from "@mui/material/Container";

export function RegistrationPage() {
  return (
    <Container maxWidth="xs" sx={{ mb: 3 }} className="container">
      <h1>Register here</h1>
      <RegistrationForm></RegistrationForm>
    </Container>
  );
}
