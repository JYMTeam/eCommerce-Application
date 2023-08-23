import { Alert, AlertTitle } from "@mui/material";

const successMessageHandler = () => {
  return (
    <Alert severity="success">
      <AlertTitle>You have successfully logged in!</AlertTitle>
      Redirecting...
    </Alert>
  );
};

export { successMessageHandler };
