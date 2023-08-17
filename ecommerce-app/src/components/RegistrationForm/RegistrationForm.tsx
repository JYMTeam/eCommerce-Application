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
  MAX_HUMAN_AGE,
  countryOptions,
} from "../../constants/constants";
import { IRegistrationInitialValues } from "../../types";
import { convertToCustomerDraft, subtractYears } from "../../utils/utils";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Autocomplete, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useState } from "react";

const postalCodes = require("postal-codes-js");

const initialValues: IRegistrationInitialValues = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  streetNameShipping: "",
  streetNameBilling: "",
  cityShipping: "",
  cityBilling: "",
  countryShipping: "",
  countryBilling: "",
  postalCodeShipping: "",
  postalCodeBilling: "",
  passwordCheck: [],
  commonAddressCheck: [],
  defaultShippingCheck: [],
  defaultBillingCheck: [],
};

const validateName = (field: string) => {
  return string()
    .required(`${field} is required`)
    .trim(`${field} must not contain leading or trailing whitespace`)
    .strict(true)
    .matches(NO_SPECIAL_CHARS_REGEX, {
      message: `${field} must not contain special charachers`,
    })
    .matches(NO_DIGIT_REGEX, {
      message: `${field} must not contain numbers`,
    });
};

const validateStreetName = () => {
  return string()
    .required("Street is required")
    .trim("Street must not contain leading or trailing whitespace")
    .strict(true);
};

const validateCity = () => {
  return string()
    .required("City is required")
    .trim("City must not contain leading or trailing whitespace")
    .strict(true)
    .matches(NO_SPECIAL_CHARS_REGEX, {
      message: "City must not contain special characters",
    })
    .matches(NO_DIGIT_REGEX, {
      message: "City must not contain numbers",
    });
};

const validatePostalCode = (countryCode: string, postalCodeFormat: string) => {
  return lazy(() =>
    string()
      .required("Postal code is required")
      .test(
        "is-correct-postal-code",
        () =>
          `Postal code must follow the country ${countryCode} format e.g. ${postalCodeFormat}`,
        (value) => {
          if (!value || !countryCode) return false;
          return typeof postalCodes.validate(countryCode, value) === "boolean";
        },
      ),
  );
};

export function RegistrationForm() {
  const [countryCodeShipping, setCountryCodeShipping] = useState("");
  const [postalCodeFormatShipping, setPostalCodeFormatShipping] = useState("");
  const [countryCodeBilling, setCountryCodeBilling] = useState("");
  const [postalCodeFormatBilling, setPostalCodeFormatBilling] = useState("");
  const [isCommonAddressChecked, setIsCommonAddressChecked] = useState(false);

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

    firstName: validateName("First name"),
    lastName: validateName("Last name"),

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
        )
        .test(
          "is-valid-age",
          () => `Your age must be within the possible human lifespan`,
          (value) => {
            if (!value) return false;
            return new Date(value) > subtractYears(new Date(), MAX_HUMAN_AGE);
          },
        ),
    ),

    streetNameShipping: validateStreetName(),
    streetNameBilling: isCommonAddressChecked
      ? string().notRequired()
      : validateStreetName(),

    cityShipping: validateCity(),
    cityBilling: isCommonAddressChecked
      ? string().notRequired()
      : validateCity(),

    countryShipping: string().required("Country is required"),
    countryBilling: isCommonAddressChecked
      ? string().notRequired()
      : string().required("Country is required"),

    postalCodeShipping: validatePostalCode(
      countryCodeShipping,
      postalCodeFormatShipping,
    ),
    postalCodeBilling: isCommonAddressChecked
      ? string().notRequired()
      : validatePostalCode(countryCodeBilling, postalCodeFormatBilling),
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
        //   streetNameShipping,
        //   cityShipping,
        //   countryShipping,
        //   postalCodeShipping,
        //   streetNameBilling,
        //   cityBilling,
        //   countryBilling,
        //   postalCodeBilling,
        //   commonAddressCheck,
        //   defaultBillingCheck,
        //   defaultShippingCheck
        // } = values;

        console.log(values);
        console.log(convertToCustomerDraft(values));
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
              }}
            >
              <FormControl fullWidth>
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
                  sx={{ mb: 0.3 }}
                />
                <TextField
                  autoComplete="off"
                  type={
                    values.passwordCheck && values.passwordCheck.length > 0
                      ? "text"
                      : "password"
                  }
                  name="password"
                  label="Password"
                  variant="standard"
                  required={true}
                  onChange={handleChange}
                  helperText={errors.password}
                  error={!!errors.password}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleChange}
                      name="passwordCheck"
                      size="small"
                    />
                  }
                  label="Show password"
                />
                <Grid container spacing={2} sx={{ mb: 0.3 }}>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="firstName"
                      label="First name"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={errors.firstName}
                      error={!!errors.firstName}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="lastName"
                      label="Last name"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={errors.lastName}
                      error={!!errors.lastName}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <DatePicker
                      label="Date of birth"
                      maxDate={dayjs(new Date())}
                      minDate={dayjs(subtractYears(new Date(), MAX_HUMAN_AGE))}
                      orientation="portrait"
                      onChange={(value) => {
                        if (!value) return false;
                        const formatedValue = value.format("YYYY-MM-DD");
                        setFieldValue("dateOfBirth", formatedValue, true);
                      }}
                      slotProps={{
                        textField: {
                          required: true,
                          variant: "standard",
                          error: !!errors.dateOfBirth,
                          helperText: errors.dateOfBirth,
                        },
                      }}
                      sx={{ mb: 0.3, width: 1 / 1 }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Box
                    component="span"
                    sx={{ fontWeight: "bold", mt: 1, mb: 0.3, ml: 1 }}
                  >
                    Shipping address
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="defaultShippingCheck"
                        size="small"
                      />
                    }
                    label={
                      isCommonAddressChecked
                        ? "Set as default for shipping/billing"
                        : "Set as default for shipping"
                    }
                    sx={{ ml: 0.1 }}
                  />
                </Grid>
                <Grid container spacing={1}>
                  <Grid item md={4} sm={6} xs={12}>
                    <Autocomplete
                      options={countryOptions}
                      onChange={(_, newValue) => {
                        if (newValue) {
                          setCountryCodeShipping(newValue.countryCode);
                          setPostalCodeFormatShipping(
                            newValue.postalCodeFormat,
                          );
                          setFieldValue(
                            "countryShipping",
                            newValue.countryCode,
                            true,
                          );
                        } else {
                          setCountryCodeShipping("");
                          setPostalCodeFormatShipping("");
                          setFieldValue("countryShipping", "", true);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="countryShipping"
                          label="Country"
                          variant="standard"
                          required={true}
                          autoComplete="off"
                          helperText={errors.countryShipping}
                          error={!!errors.countryShipping}
                          sx={{ width: 1 / 1 }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="cityShipping"
                      label="City / Town"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={errors.cityShipping}
                      error={!!errors.cityShipping}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="streetNameShipping"
                      label="Street"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={errors.streetNameShipping}
                      error={!!errors.streetNameShipping}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="postalCodeShipping"
                      label="Postal code"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={
                        !!values.countryShipping && errors.postalCodeShipping
                      }
                      error={
                        !!values.countryShipping && !!errors.postalCodeShipping
                      }
                      disabled={!values.countryShipping}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setIsCommonAddressChecked(e.target.checked);
                        handleChange(e);
                      }}
                      name="commonAddressCheck"
                      size="small"
                    />
                  }
                  label="Set as address for shipping/billing"
                  sx={
                    values.commonAddressCheck &&
                    values.commonAddressCheck.length > 0
                      ? { mb: 2 }
                      : {}
                  }
                />
                <Grid
                  container
                  spacing={1}
                  sx={
                    values.commonAddressCheck &&
                    values.commonAddressCheck.length > 0
                      ? { display: { xs: "none" } }
                      : {}
                  }
                >
                  <Box
                    component="span"
                    sx={{ fontWeight: "bold", mt: 1, mb: 0.3, ml: 1 }}
                  >
                    Billing address
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="defaultBillingCheck"
                        size="small"
                      />
                    }
                    label="Set as default for billing"
                    sx={{ ml: 0.1 }}
                  />
                </Grid>
                <Grid
                  container
                  spacing={1}
                  sx={
                    values.commonAddressCheck &&
                    values.commonAddressCheck.length > 0
                      ? { display: { xs: "none" } }
                      : { mb: 2 }
                  }
                >
                  <Grid item md={4} sm={6} xs={12}>
                    <Autocomplete
                      options={countryOptions}
                      onChange={(_, newValue) => {
                        if (newValue) {
                          setCountryCodeBilling(newValue.countryCode);
                          setPostalCodeFormatBilling(newValue.postalCodeFormat);
                          setFieldValue(
                            "countryBilling",
                            newValue.countryCode,
                            true,
                          );
                        } else {
                          setCountryCodeBilling("");
                          setPostalCodeFormatBilling("");
                          setFieldValue("countryBilling", "", true);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="countryBilling"
                          label="Country"
                          variant="standard"
                          required={true}
                          autoComplete="off"
                          helperText={errors.countryBilling}
                          error={!!errors.countryBilling}
                          sx={{ width: 1 / 1 }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="cityBilling"
                      label="City / Town"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={errors.cityBilling}
                      error={!!errors.cityBilling}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="streetNameBilling"
                      label="Street"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={errors.streetNameBilling}
                      error={!!errors.streetNameBilling}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      name="postalCodeBilling"
                      label="Postal code"
                      variant="standard"
                      required={true}
                      onChange={handleChange}
                      helperText={
                        !!values.countryBilling && errors.postalCodeBilling
                      }
                      error={
                        !!values.countryBilling && !!errors.postalCodeBilling
                      }
                      disabled={!values.countryBilling}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                </Grid>
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
