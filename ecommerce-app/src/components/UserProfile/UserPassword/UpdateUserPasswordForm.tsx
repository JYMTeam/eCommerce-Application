import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Formik, Form } from "formik";
import {
  Alert,
  AlertTitle,
  Stack,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
import { initialUpdatePasswordValues } from "../../../constants/constants";
import { setUpdateUserPasswordSchema } from "../../../utils/validation-schemas";
import { userLoginClearErrorMessage } from "../../../store/slices/userLoginSlice";
import { successMessageHandler } from "../../SignupForm/signupHelpers";
import { setUserPasswordEdit } from "../../../store/slices/userEditModeSlice";
import { fetchUpdateUserPassword } from "../../../store/actions/userActions/userUpdateActions";

const checkboxSx: SxProps<Theme> = {
  fontSize: "14px",
  marginTop: "0.5rem",
};

const passwordBoxSx: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.8rem",
};

const passwordInputSx: SxProps<Theme> = {
  flexGrow: 1,
  width: "60%",
};

const stackFormSx: SxProps<Theme> = {
  padding: "0 0.5rem 0",
  paddingTop: "2.5rem",
  boxSizing: "border-box",
};

export const UpdateUserPasswordForm = () => {
  const { loading, errorMessage, loginData, isSuccessMessage } = useAppSelector(
    (state) => state.userLogin,
  );
  const [isShowCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setShowNewPassword] = useState(false);
  const [isSamePassword, setSamePasswordError] = useState(false);

  const UpdateUserPasswordSchema = setUpdateUserPasswordSchema();

  const isUserPasswordEdit = useAppSelector(
    (state) => state.userEditMode.userPasswordEdit,
  );

  const dispatch = useAppDispatch();

  const handleEditMode = () => {
    dispatch(setUserPasswordEdit(!isUserPasswordEdit));
  };

  return (
    <Formik
      initialValues={initialUpdatePasswordValues}
      validationSchema={UpdateUserPasswordSchema}
      onSubmit={(values) => {
        if (values.currentPassword === values.newPassword) {
          setSamePasswordError(true);
        } else if (loginData) {
          dispatch(fetchUpdateUserPassword(loginData, values));
          handleEditMode();
        }
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
          if (isSamePassword) {
            setSamePasswordError(false);
          }
          handleChange(event);
        };

        const onInputFocus = () => {
          if (errorMessage) {
            dispatch(userLoginClearErrorMessage());
          }
          if (isSamePassword) {
            setSamePasswordError(false);
          }
        };

        const onCurrentPasswordCheck = () =>
          setShowCurrentPassword(!isShowCurrentPassword);
        const onNewPasswordCheck = () => setShowNewPassword(!isShowNewPassword);

        return (
          <Form
            data-testid="update-personal-form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <Stack spacing={2} sx={stackFormSx}>
                <Box sx={passwordBoxSx}>
                  <TextField
                    sx={passwordInputSx}
                    autoComplete="off"
                    type={isShowCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    label="Current Password"
                    required={true}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                    helperText={errors.currentPassword}
                    error={!!errors.currentPassword}
                    defaultValue=""
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onCurrentPasswordCheck}
                        name="currentPasswordCheck"
                      />
                    }
                    label="Show password"
                  />
                </Box>
                <Box sx={passwordBoxSx}>
                  <TextField
                    sx={passwordInputSx}
                    autoComplete="off"
                    type={isShowNewPassword ? "text" : "password"}
                    name="newPassword"
                    label="New Password"
                    required={true}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                    helperText={errors.newPassword}
                    error={!!errors.newPassword}
                    defaultValue=""
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onNewPasswordCheck}
                        name="newPasswordCheck"
                        sx={checkboxSx}
                      />
                    }
                    label="Show password"
                  />
                </Box>
                <Button type="submit" disabled={loading} variant="contained">
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
                {isSamePassword && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    You entered the same password. Try creating a new password
                  </Alert>
                )}
              </Stack>
            </FormControl>
          </Form>
        );
      }}
    </Formik>
  );
};
