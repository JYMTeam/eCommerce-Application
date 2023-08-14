import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import { object, string, lazy } from "yup";
import {
  AT_SIGN_DOMAIN_REGEX,
  UPPERCASE_LETTER_REGEX,
  LOWERCASE_LETTER_REGEX,
  DIGIT_REGEX,
  NO_SPACE_REGEX,
  NO_SPECIAL_CHARS_REGEX,
  NO_DIGIT_REGEX,
  USER_AGE_ALLOWED,
  countryOptions,
} from "../../constants/constants";
import { IRegistrationInitialValues } from "../../types";
import { subtractYears } from "../../utils/utils";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Autocomplete } from "@mui/material";
import { useState } from "react";

const postalCodes = require("postal-codes-js");

const initialValues: IRegistrationInitialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  streetName: "",
  city: "",
  country: "",
  postalCode: "",
};

export function RegistrationForm() {
  const [countryCode, setCountryCode] = useState("");
  const [postalCodeFormat, setPostalCodeFormat] = useState("");

  const RegistrationSchema = object().shape({
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

    firstName: string()
      .required("First name is required")
      .min(1, "First name is too short - should be 1 char minimum")
      .trim("First name must not contain leading or trailing whitespace")
      .strict(true)
      .matches(NO_SPECIAL_CHARS_REGEX, {
        message: "First name must not contain special charachers",
      })
      .matches(NO_DIGIT_REGEX, {
        message: "First name must not contain numbers",
      }),

    lastName: string()
      .required("Last name is required")
      .trim("Last name must not contain leading or trailing whitespace")
      .strict(true)
      .matches(NO_SPECIAL_CHARS_REGEX, {
        message: "Last name must not contain special charachers",
      })
      .matches(NO_DIGIT_REGEX, {
        message: "Last name must not contain numbers",
      }),

    dateOfBirth: lazy(() =>
      string()
        .required("Birthday is required")
        .test(
          "is-allowed-age",
          () =>
            `You must be ${USER_AGE_ALLOWED} years old or above to register`,
          (value) => {
            if (!value) return false;
            return (
              new Date(value) < subtractYears(new Date(), USER_AGE_ALLOWED)
            );
          },
        ),
    ),

    streetName: string()
      .required("Street is required")
      .trim("Street must not contain leading or trailing whitespace")
      .strict(true),

    city: string()
      .required("City is required")
      .trim("City must not contain leading or trailing whitespace")
      .strict(true)
      .matches(NO_SPECIAL_CHARS_REGEX, {
        message: "City must not contain special charachers",
      })
      .matches(NO_DIGIT_REGEX, {
        message: "City must not contain numbers",
      }),

    country: string().required("Country is required"),

    postalCode: lazy(() =>
      string()
        .required("Postal code is required")
        .test(
          "is-correct-postal-code",
          () =>
            `Postal code must follow the country ${countryCode} format e.g. ${postalCodeFormat}`,
          (value) => {
            if (!value || !countryCode) return false;
            return (
              typeof postalCodes.validate(countryCode, value) === "boolean"
            );
          },
        ),
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={(values) => {
        //fires onSubmit by button or enter
        // const {
        //   email,
        //   password,
        //   firstName,
        //   lastName,
        //   dateOfBirth,
        //   streetName,
        //   city,
        //   country,
        //   postalCode,
        // } = values;
      }}
    >
      {(formik) => {
        const { values, handleChange, errors, setFieldValue } = formik;
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
                  autoComplete="off"
                  name="firstName"
                  label="First name"
                  variant="standard"
                  required={true}
                  onChange={handleChange}
                  helperText={errors.firstName}
                  error={!!errors.firstName}
                  sx={{ mb: 0.5 }}
                />
                <TextField
                  autoComplete="off"
                  name="lastName"
                  label="Last name"
                  variant="standard"
                  required={true}
                  onChange={handleChange}
                  helperText={errors.lastName}
                  error={!!errors.lastName}
                  sx={{ mb: 0.5 }}
                />
                <DatePicker
                  label="Date of birth"
                  maxDate={dayjs(new Date())}
                  orientation="portrait"
                  onChange={(value) => {
                    if (!value) return false;
                    const formatedValue = value.format("YYYY-MM-DD");
                    setFieldValue("dateOfBirth", formatedValue, true);
                  }}
                  sx={{ mb: 0.5 }}
                  slotProps={{
                    textField: {
                      required: true,
                      variant: "standard",
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth,
                    },
                  }}
                />
                <TextField
                  autoComplete="off"
                  name="email"
                  label="Email"
                  variant="standard"
                  placeholder=" user@example.com"
                  required={true}
                  onChange={handleChange}
                  helperText={errors.email}
                  error={!!errors.email}
                  sx={{ mb: 0.5 }}
                />
                <TextField
                  autoComplete="off"
                  type="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  required={true}
                  onChange={handleChange}
                  helperText={errors.password}
                  error={!!errors.password}
                  sx={{ mb: 0.5 }}
                />
                <TextField
                  autoComplete="off"
                  name="streetName"
                  label="Street"
                  variant="standard"
                  required={true}
                  onChange={handleChange}
                  helperText={errors.streetName}
                  error={!!errors.streetName}
                  sx={{ mb: 0.5 }}
                />
                <TextField
                  autoComplete="off"
                  name="city"
                  label="City / Town"
                  variant="standard"
                  required={true}
                  onChange={handleChange}
                  helperText={errors.city}
                  error={!!errors.city}
                  sx={{ mb: 0.5 }}
                />
                <Autocomplete
                  options={countryOptions}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setCountryCode(newValue.countryCode);
                      setPostalCodeFormat(newValue.postalCodeFormat);
                      setFieldValue("country", newValue.countryCode, true);
                    } else {
                      setCountryCode("");
                      setPostalCodeFormat("");
                      setFieldValue("country", "", true);
                    }
                  }}
                  sx={{ mb: 0.5 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="country"
                      label="Country"
                      variant="standard"
                      required={true}
                      autoComplete="off"
                      helperText={errors.country}
                      error={!!errors.country}
                    />
                  )}
                />
                <TextField
                  autoComplete="off"
                  name="postalCode"
                  label="Postal code"
                  variant="standard"
                  required={true}
                  onChange={handleChange}
                  helperText={!!values.country && errors.postalCode}
                  error={!!values.country && !!errors.postalCode}
                  disabled={!values.country}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" size="large">
                  Register
                </Button>
              </FormControl>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
