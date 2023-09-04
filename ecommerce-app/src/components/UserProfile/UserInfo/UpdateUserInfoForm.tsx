import React from "react";
import { setUpdateUserInfoSchema } from "../../../utils/validation-schemas";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Formik, Form } from "formik";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FORM_DATE_FORMAT, MAX_HUMAN_AGE } from "../../../constants/constants";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { subtractYears } from "../../../utils/utils";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { IUpdatePersonalValues } from "../../../types";
import { fetchUpdateUserPersonalInfo } from "../../../store/actions/userLoginActions";
import { userLoginClearErrorMessage } from "../../../store/slices/userLoginSlice";
import { successMessageHandler } from "../../SignupForm/signupHelpers";

export interface IUpdateUserInfoProps {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export function UpdateUserInfoForm({
  email,
  firstName,
  lastName,
  dateOfBirth,
}: IUpdateUserInfoProps) {
  const UpdateUserInfoSchema = setUpdateUserInfoSchema();
  const { loading, errorMessage, loginData, tokenData, isSuccessMessage } =
    useAppSelector((state) => state.userLogin);
  const BIRTHDAY_INPUT_NAME = "dateOfBirth";

  const initialUpdateUserInfoValues: IUpdatePersonalValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    dateOfBirth: dateOfBirth || "",
  };
  const dispatch = useAppDispatch();
  return (
    <Formik
      initialValues={initialUpdateUserInfoValues}
      validationSchema={UpdateUserInfoSchema}
      onSubmit={(values) => {
        console.log("save values");
        console.log(values);

        if (loginData && tokenData && tokenData?.token !== "") {
          dispatch(fetchUpdateUserPersonalInfo(tokenData, loginData, values));
        }
      }}
    >
      {(formik) => {
        const { handleChange, errors, setFieldValue } = formik;
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
        const onDatePickerChange = (value: dayjs.Dayjs | null) => {
          if (!value) return false;
          const formatedValue = value.format(FORM_DATE_FORMAT);
          setFieldValue(BIRTHDAY_INPUT_NAME, formatedValue, true);
        };
        return (
          <Form
            data-testid="update-personal-form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <Stack spacing={2}>
                <TextField
                  autoComplete="off"
                  name="firstName"
                  label="First name"
                  required={true}
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.firstName}
                  error={!!errors.firstName}
                  defaultValue={firstName}
                />
                <TextField
                  autoComplete="off"
                  name="lastName"
                  label="Last name"
                  required={true}
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.lastName}
                  error={!!errors.lastName}
                  defaultValue={lastName}
                />
                <TextField
                  name="email"
                  label="Email"
                  placeholder=" user@example.com"
                  required={true}
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.email}
                  error={!!errors.email}
                  defaultValue={email}
                />
                <DatePicker
                  label="Date of birth"
                  maxDate={dayjs(new Date())}
                  minDate={dayjs(subtractYears(new Date(), MAX_HUMAN_AGE))}
                  orientation="portrait"
                  onChange={onDatePickerChange}
                  slotProps={{
                    textField: {
                      required: true,
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth,
                    },
                  }}
                  defaultValue={dayjs(new Date(dateOfBirth || ""))}
                />
                <Button type="submit" disabled={loading}>
                  Save Changes
                </Button>
                {isSuccessMessage && (
                  <>
                    {successMessageHandler(
                      "You have successfully updated your personal data!",
                    )}
                  </>
                )}
                {errorMessage && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                  </Alert>
                )}
              </Stack>
            </FormControl>
          </Form>
        );
      }}
    </Formik>
  );
}
