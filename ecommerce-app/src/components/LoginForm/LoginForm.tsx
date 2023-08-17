import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import {
  AT_SIGN_DOMAIN_REGEX,
  UPPERCASE_LETTER_REGEX,
  LOWERCASE_LETTER_REGEX,
  DIGIT_REGEX,
  NO_SPACE_REGEX,
} from "../../constants/constants";
import { IFormInitialValues } from "../../types";
import { fetchUserLogin } from "../../store/actions/userLoginActions";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { convertToUserAuthOptions } from "../../utils/utils";
import { userLoginClearErrorMessage } from "../../store/slices/userLoginSlice";
// const existingUser: UserAuthOptions = {
//   username: "johndoe@example.com",
//   password: "Secret123",
// };
export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const initialValues: IFormInitialValues = {
    email: "",
    password: "",
    passwordCheck: [],
  };

  const LoginSchema = object().shape({
    email: string()
      .required("Email is required")
      .trim("Email must not contain leading or trailing whitespace")
      .strict(true)
      .matches(NO_SPACE_REGEX, {
        message: "Email must not contain middle whitespace",
      })
      .matches(AT_SIGN_DOMAIN_REGEX, {
        message: "Email must contain an '@' sign followed by domain in latin",
      })
      .email("Email must be properly formatted e.g., user@example.com"),

    password: string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum")
      .trim("Password must not contain leading or trailing whitespace")
      .strict(true)
      .matches(UPPERCASE_LETTER_REGEX, {
        message: "Password must contain at least one latin uppercase letter",
      })
      .matches(LOWERCASE_LETTER_REGEX, {
        message: "Password must contain at least one latin lowercase letter",
      })
      .matches(DIGIT_REGEX, {
        message: "Password must contain at least one digit ",
      })
      .matches(NO_SPACE_REGEX, {
        message: "Password must not contain middle whitespace",
      }),
  });

  const { errorMessage, loading, isLogged } = useAppSelector(
    (state) => state.userLogin,
  );
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        const existingUser: UserAuthOptions = convertToUserAuthOptions(values);
        dispatch(fetchUserLogin(existingUser));
      }}
    >
      {(formik) => {
        const { handleChange, errors } = formik;
        return (
          <Form noValidate autoComplete="off">
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
                  onChange={(event) => {
                    if (errorMessage) {
                      dispatch(userLoginClearErrorMessage(""));
                    }
                    handleChange(event);
                  }}
                  onFocus={() => {
                    if (errorMessage) {
                      dispatch(userLoginClearErrorMessage(""));
                    }
                  }}
                  helperText={errors.email}
                  error={!!errors.email}
                />
                <TextField
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  variant="standard"
                  required={true}
                  sx={{ mb: 2 }}
                  onChange={(event) => {
                    if (errorMessage) {
                      dispatch(userLoginClearErrorMessage(""));
                    }
                    handleChange(event);
                  }}
                  onFocus={() => {
                    if (errorMessage) {
                      dispatch(userLoginClearErrorMessage(""));
                    }
                  }}
                  helperText={errors.password}
                  error={!!errors.password}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={
                        () => setShowPassword(!showPassword)
                        // handleChange
                      }
                      name="check"
                    />
                  }
                  label="Show password"
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  Log in
                </Button>
                {isLogged && (
                  <span
                    style={{
                      color: "green",
                      marginTop: "8px",
                      fontSize: "0.85rem",
                    }}
                  >
                    {"You have successfully logged in!"}
                  </span>
                )}
                {errorMessage && (
                  <span
                    style={{
                      color: "red",
                      marginTop: "8px",
                      fontSize: "0.85rem",
                    }}
                  >
                    {errorMessage}
                  </span>
                )}
              </FormControl>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
