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

export function LoginForm() {
  const initialValues: IFormInitialValues = {
    email: "",
    password: "",
    check: [],
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        //fires onSubmit by button or enter
      }}
    >
      {(formik) => {
        const { values, handleChange, errors } = formik;
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
                  onChange={handleChange}
                  helperText={errors.email}
                  error={!!errors.email}
                />
                <TextField
                  autoComplete="off"
                  type={
                    values.check && values.check.length > 0
                      ? "text"
                      : "password"
                  }
                  name="password"
                  label="Password"
                  variant="standard"
                  required={true}
                  sx={{ mb: 2 }}
                  onChange={handleChange}
                  helperText={errors.password}
                  error={!!errors.password}
                />
                <FormControlLabel
                  control={<Checkbox onChange={handleChange} name="check" />}
                  label="Show password"
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" size="large">
                  Log in
                </Button>
              </FormControl>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
