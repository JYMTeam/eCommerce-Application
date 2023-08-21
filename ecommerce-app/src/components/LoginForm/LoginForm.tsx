import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form } from "formik";
import { initialLoginValues } from "../../constants/constants";
import { fetchUserLogin } from "../../store/actions/userLoginActions";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { convertToUserAuthOptions } from "../../utils/utils";
import { userLoginClearErrorMessage } from "../../store/slices/userLoginSlice";
import { Alert, AlertTitle } from "@mui/material";
import { setLoginSchema } from "../../utils/validation-schemas";

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const LoginSchema = setLoginSchema();
  const { errorMessage, loading, isSuccessMessage } = useAppSelector(
    (state) => state.userLogin,
  );
  const dispatch = useAppDispatch();

  const successMessageHandler = () => {
    return (
      <Alert severity="success">
        <AlertTitle>You have successfully logged in!</AlertTitle>
        Redirecting...
      </Alert>
    );
  };

  return (
    <Formik
      initialValues={initialLoginValues}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        const existingUser: UserAuthOptions = convertToUserAuthOptions(values);
        dispatch(fetchUserLogin(existingUser));
      }}
    >
      {(formik) => {
        const { handleChange, errors } = formik;

        const onInputChange = (
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          if (errorMessage) {
            dispatch(userLoginClearErrorMessage());
          }
          handleChange(event);
        };

        const onInputFocus = () => {
          if (errorMessage) {
            dispatch(userLoginClearErrorMessage());
          }
        };

        return (
          <Form data-testid="login-form" noValidate autoComplete="off">
            <Box
              sx={{
                bgcolor: "background.paper",
                boxShadow: 4,
                borderRadius: 2,
                p: 2,
                minHeight: 230,
                fontSize: 24,
              }}
            >
              <FormControl fullWidth>
                <TextField
                  name="email"
                  label="Email"
                  variant="standard"
                  placeholder=" user@example.com"
                  required={true}
                  sx={{ mb: 1 }}
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.email}
                  error={!!errors.email}
                  disabled={isSuccessMessage}
                />
                <TextField
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  variant="standard"
                  required={true}
                  sx={{ mb: 2 }}
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.password}
                  error={!!errors.password}
                  disabled={isSuccessMessage}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => setShowPassword(!showPassword)}
                      name="check"
                      disabled={isSuccessMessage}
                    />
                  }
                  label="Show password"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || isSuccessMessage}
                >
                  Log in
                </Button>
                {isSuccessMessage && <>{successMessageHandler()}</>}
                {errorMessage && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                  </Alert>
                )}
              </FormControl>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
