import React from "react";
import { setUpdatePersonalSchema } from "../../utils/validation-schemas";
import { useAppSelector } from "../../hooks/redux";
import { Formik, Form } from "formik";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { initialUpdatePersonalValues } from "../../constants/constants";
import { Stack } from "@mui/material";

export interface UpdatePersonalProps {
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
}

export function UpdatePersonalForm({
  email,
  firstName,
  lastName,
  dateOfBirth,
}: UpdatePersonalProps) {
  const UpdatePersonalSchema = setUpdatePersonalSchema();
  const { loading } = useAppSelector((state) => state.userLogin);

  return (
    <Formik
      initialValues={initialUpdatePersonalValues}
      validationSchema={UpdatePersonalSchema}
      onSubmit={(values) => {
        console.log("save values");
        console.log(values);
      }}
    >
      {(formik) => {
        const { handleChange, errors } = formik;
        const onInputChange = (
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
          // if (errorMessage) {
          //   dispatch(userLoginClearErrorMessage());
          // }
          handleChange(event);
        };

        const onInputFocus = () => {
          // if (errorMessage) {
          //   dispatch(userLoginClearErrorMessage());
          // }
        };

        // const onPasswordCheckChange = () => setShowPassword(!showPassword);
        return (
          <Form
            data-testid="update-personal-form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <Stack spacing={2}>
                <TextField
                  name="email"
                  label="Email"
                  // variant="standard"
                  placeholder=" user@example.com"
                  required={true}
                  // sx={{ mb: 1 }}
                  onChange={onInputChange}
                  onFocus={onInputFocus}
                  helperText={errors.email}
                  error={!!errors.email}
                  defaultValue={email}
                  // disabled={isSuccessMessage}
                />
                <Button
                  type="submit"
                  // variant="contained"
                  // size="large"
                  disabled={loading}
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
