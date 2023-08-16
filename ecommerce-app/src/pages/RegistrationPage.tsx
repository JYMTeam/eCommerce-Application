import { Box } from "@mui/material";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export function RegistrationPage() {
  return (
    <Container
      maxWidth="md"
      sx={{ height: 1 / 1, pb: 5 }}
      className="container"
    >
      <h1>Register here</h1>
      <RegistrationForm></RegistrationForm>
      <Box sx={{ pt: "2em" }}>
        <Link className="redirect-link" to="/login" color="primary">
          Already have an account? Login here!
        </Link>
      </Box>
    </Container>
  );
}
