import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import {
  MAX_HUMAN_AGE,
  countryOptions,
  initialSignUpValues,
  FORM_DATE_FORMAT,
  initialCountryOptions,
} from "../../constants/constants";
import { convertToCustomerDraft, subtractYears } from "../../utils/utils";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { CustomerDraft } from "@commercetools/platform-sdk";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUserSignup } from "../../store/actions/userActions/userSignupActions";
import { setSignupSchema } from "../../utils/validation-schemas";
import { userSignupClearErrorMessage } from "../../store/slices/userSignupSlice";
import { successMessageHandler } from "./signupHelpers";
import { ICountriesOptions, ISignupInitialValues } from "../../types";

const EMPTY_STR = "";
const BIRTHDAY_INPUT_NAME = "dateOfBirth";
const COUNTRY_SHIPPING_INPUT_NAME = "countryShipping";
const COUNTRY_BILLING_INPUT_NAME = "countryBilling";
const SIGNUP_BORDER_COLOR = "#dbd8d8";

export function SignupForm() {
  const [countryCodeShipping, setCountryCodeShipping] = useState(EMPTY_STR);
  const [postalCodeFormatShipping, setPostalCodeFormatShipping] =
    useState(EMPTY_STR);
  const [countryCodeBilling, setCountryCodeBilling] = useState(EMPTY_STR);
  const [postalCodeFormatBilling, setPostalCodeFormatBilling] =
    useState(EMPTY_STR);
  const [isCommonAddressChecked, setIsCommonAddressChecked] = useState(false);

  const SchemaOptions = {
    countryCodeShipping,
    countryCodeBilling,
    postalCodeFormatShipping,
    postalCodeFormatBilling,
    isCommonAddressChecked,
  };

  const SignupSchema = setSignupSchema(SchemaOptions);
  const { loading, errorMessage } = useAppSelector((state) => state.userSignup);
  const { isLogged, isSuccessMessage } = useAppSelector(
    (state) => state.userLogin,
  );
  const { tokenAnonymData, cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const onSubmit = (values: ISignupInitialValues) => {
    const newUser: CustomerDraft = convertToCustomerDraft(values);
    if (tokenAnonymData && cart) {
      dispatch(fetchUserSignup(newUser, tokenAnonymData.refreshToken));
    } else {
      dispatch(fetchUserSignup(newUser));
    }
  };

  return (
    <Formik
      initialValues={initialSignUpValues}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, handleChange, errors, setFieldValue } = formik;
        const onInputChange = (
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          if (errorMessage) {
            dispatch(userSignupClearErrorMessage());
          }
          handleChange(event);
        };

        const onInputFocus = () => {
          if (errorMessage) {
            dispatch(userSignupClearErrorMessage());
          }
        };

        const onDatePickerChange = (value: dayjs.Dayjs | null) => {
          if (!value) return false;
          const formatedValue = value.format(FORM_DATE_FORMAT);
          setFieldValue(BIRTHDAY_INPUT_NAME, formatedValue, true);
        };

        const onCountryShippingChange = (
          _: React.SyntheticEvent<Element, Event>,
          newValue: ICountriesOptions | null = initialCountryOptions,
        ) => {
          if (!newValue) return;
          const { countryCode, postalCodeFormat } = newValue;
          setCountryCodeShipping(countryCode);
          setPostalCodeFormatShipping(postalCodeFormat);
          setFieldValue(COUNTRY_SHIPPING_INPUT_NAME, countryCode, true);
        };

        const onCountryBillingChange = (
          _: React.SyntheticEvent<Element, Event>,
          newValue: ICountriesOptions | null = initialCountryOptions,
        ) => {
          if (!newValue) return;
          const { countryCode, postalCodeFormat } = newValue;
          setCountryCodeBilling(countryCode);
          setPostalCodeFormatBilling(postalCodeFormat);
          setFieldValue(COUNTRY_BILLING_INPUT_NAME, countryCode, true);
        };

        const onCommonCheckboxChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setIsCommonAddressChecked(event.target.checked);
          handleChange(event);
        };

        return (
          <Form data-testid="signup-form" noValidate autoComplete="off">
            <Box
              sx={{
                bgcolor: "background.paper",
                boxShadow: 0,
                borderRadius: 0,
                border: `1px solid ${SIGNUP_BORDER_COLOR}`,
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
                  onChange={onInputChange}
                  onFocus={onInputFocus}
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
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.password}
                  error={!!errors.password}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                      onChange={onDatePickerChange}
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
                <Grid container spacing={1} mt={4} mb={1}>
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      mt: 1,
                      mb: 0.3,
                      ml: 1,
                    }}
                  >
                    Shipping address
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onInputChange}
                        onFocus={onInputFocus}
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
                      onChange={onCountryShippingChange}
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
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                      onChange={onCommonCheckboxChange}
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
                  mt={4}
                  mb={1}
                  sx={
                    values.commonAddressCheck &&
                    values.commonAddressCheck.length > 0
                      ? { display: { xs: "none" } }
                      : {}
                  }
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      mt: 1,
                      mb: 0.3,
                      ml: 1,
                    }}
                  >
                    Billing address
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onInputChange}
                        onFocus={onInputFocus}
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
                      onChange={onCountryBillingChange}
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
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                      onChange={onInputChange}
                      onFocus={onInputFocus}
                      helperText={errors.streetNameBilling}
                      error={!!errors.streetNameBilling}
                      sx={{ width: 1 / 1 }}
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12} mb={2}>
                    <TextField
                      autoComplete="off"
                      name="postalCodeBilling"
                      label="Postal code"
                      variant="standard"
                      required={true}
                      onChange={onInputChange}
                      onFocus={onInputFocus}
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
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || isLogged || isSuccessMessage}
                >
                  Sign up
                </Button>
                {isSuccessMessage && (
                  <>
                    {successMessageHandler(
                      "You have successfully signed up and logged in",
                    )}
                  </>
                )}
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
