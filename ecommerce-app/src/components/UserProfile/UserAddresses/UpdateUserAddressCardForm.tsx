import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormControl from "@mui/material/FormControl";
import {
  // Alert,
  // AlertTitle,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
  Box,
  Button,
  Stack,
  // Grid,
} from "@mui/material";
import { setUpdateUserAddressSchema } from "../../../utils/validation-schemas";
import {
  ICountriesOptions,
  IUpdateAddressInitialValues,
  IUpdateAddressSchemaOptions,
} from "../../../types";
import {
  countryOptions,
  initialCountryOptions,
  initialUpdateAddressValues,
} from "../../../constants/constants";

export interface IUpdateUserAddressProps {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  isBilling?: boolean;
  isShipping?: boolean;
  isDefault?: boolean;
}
const EMPTY_STR = "";
const COUNTRY_SHIPPING_INPUT_NAME = "countryShipping";
// const COUNTRY_BILLING_INPUT_NAME = "countryBilling";

export function UpdateUserAddressCardForm({
  streetName,
  city,
  country,
  postalCode,
  isBilling = false,
  isShipping = false,
  isDefault = false,
}: IUpdateUserAddressProps) {
  const [countryCode, setCountryCode] = useState(EMPTY_STR);
  const [postalCodeFormat, setPostalCodeFormat] = useState(EMPTY_STR);
  const [isDefaultChecked] = useState(false);
  const [isShippingChecked] = useState(false);
  const [isBillingChecked] = useState(false);
  const schemaOptions: IUpdateAddressSchemaOptions = {
    countryCode,
    postalCodeFormat,
    isBillingAddress: isBillingChecked,
    isShippingAddress: isShippingChecked,
    isDefaultAddress: isDefaultChecked,
  };
  console.log(
    streetName,
    city,
    country,
    postalCode,
    isBilling,
    isShipping,
    isDefault,
  );
  const UpdateAddressSchema = setUpdateUserAddressSchema(schemaOptions);

  const onSubmit = (values: IUpdateAddressInitialValues) => {
    console.log("update values address");
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialUpdateAddressValues}
      validationSchema={UpdateAddressSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        const { values, handleChange, errors, setFieldValue } = formik;
        const onInputChange = (
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          // if (errorMessage) {
          //   dispatch(userSignupClearErrorMessage());
          // }
          handleChange(event);
        };

        const onInputFocus = () => {
          // if (errorMessage) {
          //   dispatch(userSignupClearErrorMessage());
          // }
        };

        const onCountryChange = (
          _: React.SyntheticEvent<Element, Event>,
          newValue: ICountriesOptions | null = initialCountryOptions,
        ) => {
          if (!newValue) return;
          const { countryCode, postalCodeFormat } = newValue;
          setCountryCode(countryCode);
          setPostalCodeFormat(postalCodeFormat);
          setFieldValue(COUNTRY_SHIPPING_INPUT_NAME, countryCode, true);
        };

        const onCheckboxChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          // setIsCommonAddressChecked(event.target.checked);
          handleChange(event);
        };

        return (
          <Form data-testid="update-address-form" noValidate autoComplete="off">
            <FormControl>
              <Stack spacing={2}>
                <Autocomplete
                  options={countryOptions}
                  onChange={onCountryChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="country"
                      label="Country"
                      required={true}
                      autoComplete="off"
                      helperText={errors.country}
                      error={!!errors.country}
                    />
                  )}
                />
                <TextField
                  name="city"
                  label="City / Town"
                  required={true}
                  autoComplete="off"
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.city}
                  error={!!errors.city}
                />
                <TextField
                  name="streetName"
                  label="Street"
                  required={true}
                  autoComplete="off"
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.streetName}
                  error={!!errors.streetName}
                />
                <TextField
                  name="postalCode"
                  label="Postal code"
                  required={true}
                  autoComplete="off"
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={!!values.country && errors.postalCode}
                  error={!!values.country && !!errors.postalCode}
                  disabled={!values.country}
                />
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onCheckboxChange}
                        // onFocus={onInputFocus}
                        name="defaultCheck"
                        size="small"
                      />
                    }
                    label={<span style={{ fontSize: "15px" }}>Default</span>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onCheckboxChange}
                        // onFocus={onInputFocus}
                        name="billingCheck"
                        size="small"
                      />
                    }
                    label={"Billing"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onCheckboxChange}
                        // onFocus={onInputFocus}
                        name="shippingCheck"
                        size="small"
                      />
                    }
                    label={"Shipping"}
                  />
                </Box>
                <Button
                  type="submit"
                  // variant="contained"
                  size="large"
                  // disabled={loading || isLogged || isSuccessMessage}
                >
                  Save Changes
                </Button>
              </Stack>
            </FormControl>
          </Form>
        );
      }}
    </Formik>
  );
}
