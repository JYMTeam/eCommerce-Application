import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import {
  MAX_HUMAN_AGE,
  countryOptions,
  initialSignUpValues,
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
import { fetchUserSignup } from "../../store/actions/userSignupActions";
import { setSignupSchema } from "../../utils/validation-schemas";
import { userSignupClearErrorMessage } from "../../store/slices/userSignupSlice";

export function SignupForm() {
  const [countryCodeShipping, setCountryCodeShipping] = useState("");
  const [postalCodeFormatShipping, setPostalCodeFormatShipping] = useState("");
  const [countryCodeBilling, setCountryCodeBilling] = useState("");
  const [postalCodeFormatBilling, setPostalCodeFormatBilling] = useState("");
  const [isCommonAddressChecked, setIsCommonAddressChecked] = useState(false);

  const SchemaOptions = {
    countryCodeShipping,
    postalCodeFormatShipping,
    countryCodeBilling,
    postalCodeFormatBilling,
    isCommonAddressChecked,
  };

  const SignupSchema = setSignupSchema(SchemaOptions);
  const dispatch = useAppDispatch();
  const { loading, errorMessage } = useAppSelector((state) => state.userSignup);
  const { isLogged, isSuccessMessage } = useAppSelector(
    (state) => state.userLogin,
  );

  const successMessageHandler = () => {
    return (
      <Alert severity="success">
        <AlertTitle>You have successfully signed up and logged in</AlertTitle>
        Redirecting...
      </Alert>
    );
  };
  return (
    <Formik
      initialValues={initialSignUpValues}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        const newUser: CustomerDraft = convertToCustomerDraft(values);
        dispatch(fetchUserSignup(newUser));
      }}
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
        return (
          <Form data-testid="signup-form" noValidate autoComplete="off">
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
