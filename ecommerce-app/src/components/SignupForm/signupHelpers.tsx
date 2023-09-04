import { Alert, AlertTitle } from "@mui/material";

const successMessageHandler = (message: string) => {
  return (
    <Alert severity="success">
      <AlertTitle>{message}</AlertTitle>
      Redirecting...
    </Alert>
  );
};

export { successMessageHandler };
