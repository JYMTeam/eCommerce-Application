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
  // initialUpdateAddressValues,
} from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUpdateUserAddress } from "../../../store/actions/userLoginActions";

export interface IUpdateUserAddressProps {
  addressArrIndex: number;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  isBilling?: boolean;
  isShipping?: boolean;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
}
const COUNTRY_INPUT_NAME = "country";

export function UpdateUserAddressCardForm({
  addressArrIndex,
  streetName,
  city,
  country,
  postalCode,
  isBilling = false,
  isShipping = false,
  isDefaultBilling = false,
  isDefaultShipping = false,
}: IUpdateUserAddressProps) {
  const [countryCode, setCountryCode] = useState(country);
  const [postalCodeFormat, setPostalCodeFormat] = useState(postalCode);
  const [isDefaultBillingChecked, setIsDefaultBillingChecked] =
    useState(isDefaultBilling);
  const [isDefaultShippingChecked, setIsDefaultShippingChecked] =
    useState(isDefaultShipping);
  const [isDefaultBillingNotDisabled, setIsDefaultBillingNotDisabled] =
    useState(isBilling);
  const [isDefaultShippingNotDisabled, setIsDefaultShippingNotDisabled] =
    useState(isShipping);
  const [isShippingChecked, setIsShippingChecked] = useState(isShipping);
  const [isBillingChecked, setIsBillingChecked] = useState(isBilling);
  const schemaOptions: IUpdateAddressSchemaOptions = {
    countryCode,
    postalCodeFormat,
    isBillingAddress: isBillingChecked,
    isShippingAddress: isShippingChecked,
    isDefaultBillingAddress: isDefaultBillingChecked,
    isDefaultShippingAddress: isDefaultShippingChecked,
  };

  const UpdateAddressSchema = setUpdateUserAddressSchema(schemaOptions);
  const { loginData, tokenData } = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();

  const onSubmit = (values: IUpdateAddressInitialValues) => {
    if (loginData && tokenData && tokenData?.token !== "") {
      dispatch(
        fetchUpdateUserAddress(tokenData, loginData, addressArrIndex, values),
      );
    }
  };

  const initialUpdateAddressValues: IUpdateAddressInitialValues = {
    streetName,
    city,
    country,
    postalCode,
    isBilling,
    isShipping,
    isDefaultBilling,
    isDefaultShipping,
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
          setFieldValue(COUNTRY_INPUT_NAME, countryCode, true);
        };
        const onDefaultBillingCheckBoxChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setIsDefaultBillingChecked(event.target.checked);
          handleChange(event);
        };
        const onDefaultShippingCheckBoxChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setIsDefaultShippingChecked(event.target.checked);
          handleChange(event);
        };
        const onBillingCheckBoxChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setIsBillingChecked(event.target.checked);
          if (!event.target.checked) {
            setIsDefaultBillingNotDisabled(false);
          } else {
            setIsDefaultBillingNotDisabled(true);
          }
          handleChange(event);
        };
        const onShippingCheckBoxChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setIsShippingChecked(event.target.checked);
          if (!event.target.checked) {
            setIsDefaultShippingNotDisabled(false);
          } else {
            setIsDefaultShippingNotDisabled(true);
          }
          handleChange(event);
        };
        return (
          <Form data-testid="update-address-form" noValidate autoComplete="off">
            <FormControl>
              <Stack
                spacing={2}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  borderRadius: "4px",
                }}
              >
                <TextField
                  name="streetName"
                  label="Street"
                  required={true}
                  autoComplete="off"
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.streetName}
                  error={!!errors.streetName}
                  defaultValue={streetName}
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
                  defaultValue={city}
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
                  defaultValue={postalCode}
                />
                <Autocomplete
                  options={countryOptions}
                  defaultValue={countryOptions.find(
                    (option) => option.countryCode === country,
                  )}
                  onChange={onCountryChange}
                  // value={{
                  //   label: "Germany",
                  //   countryCode: "DE",
                  //   postalCodeFormat:"12345"
                  // }}
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
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onBillingCheckBoxChange}
                        // onFocus={onInputFocus}
                        name="isBilling"
                        size="small"
                        checked={isBillingChecked}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontSize: "14px",
                          marginLeft: "-7px",
                        }}
                      >
                        Billing
                      </span>
                    }
                    sx={{
                      backgroundColor: "#00000014",
                      padding: "1px 12px 0px 1px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onShippingCheckBoxChange}
                        // onFocus={onInputFocus}
                        name="isShipping"
                        size="small"
                        checked={isShippingChecked}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontSize: "14px",
                          marginLeft: "-7px",
                        }}
                      >
                        Shipping
                      </span>
                    }
                    sx={{
                      backgroundColor: "#00000014",
                      padding: "1px 12px 0px 1px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onDefaultBillingCheckBoxChange}
                        // onFocus={onInputFocus}
                        name="isDefaultBilling"
                        size="small"
                        disabled={!isDefaultBillingNotDisabled}
                        checked={
                          isDefaultBillingChecked && isDefaultBillingNotDisabled
                        }
                      />
                    }
                    label={
                      <span
                        style={{
                          fontSize: "14px",
                          marginLeft: "-7px",
                        }}
                      >
                        Default B.
                      </span>
                    }
                    sx={{
                      backgroundColor: "#00000014",
                      padding: "1px 12px 0px 1px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onDefaultShippingCheckBoxChange}
                        // onFocus={onInputFocus}
                        name="isDefaultShipping"
                        size="small"
                        disabled={!isDefaultShippingNotDisabled}
                        checked={
                          isDefaultShippingChecked &&
                          isDefaultShippingNotDisabled
                        }
                      />
                    }
                    label={
                      <span
                        style={{
                          fontSize: "14px",
                          marginLeft: "-7px",
                        }}
                      >
                        Default S.
                      </span>
                    }
                    sx={{
                      backgroundColor: "#00000014",
                      padding: "1px 12px 0px 1px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
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