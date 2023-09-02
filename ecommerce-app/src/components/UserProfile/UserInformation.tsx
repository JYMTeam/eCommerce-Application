import * as React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../hooks/redux";
import { Button, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { InfoCard } from "../basic-components/InfoCard/InfoCard";
import { formatDateYYYYMMDDToDDMMYYYY } from "../../utils/utils";

const EditButtonStyles = {
  zIndex: "1",
  ":hover": {
    bgcolor: "transparent",
    color: "primary.dark",
  },
};

export default function UserInformation() {
  const [isEdit, setIsEdit] = React.useState(false);
  const { errorMessage, loading, loginData } = useAppSelector(
    (state) => state.userLogin,
  );

  const handelEditMode = () => {
    setIsEdit(!isEdit);
  };
  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  if (loginData) {
    const { email, firstName, lastName, dateOfBirth } = loginData;
    const lDateOfBirth = formatDateYYYYMMDDToDDMMYYYY(dateOfBirth || "");
    const userData = [
      { label: "First Name", value: loginData.firstName as unknown as string },
      { label: "Last Name", value: loginData.lastName as unknown as string },
      { label: "E-mail", value: loginData.email as unknown as string },
      {
        label: "Date of Birth",
        value: lDateOfBirth,
      },
    ];
    return (
      <Box className="personal-info" sx={{ width: "50%", minWidth: "280px" }}>
        <Tooltip
          className="personal-info__edit"
          sx={{
            justifyContent: "center",
            position: "absolute",
            top: 16,
            right: 16,
          }}
          title="Edit mode"
        >
          <IconButton
            color="primary"
            aria-label="edit mode"
            sx={EditButtonStyles}
            onClick={handelEditMode}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        {!isEdit && <InfoCard infoData={userData} />}
        {isEdit && (
          <Stack spacing={2}>
            <TextField
              id="user-first-name"
              label="First Name"
              defaultValue={firstName as unknown as string}
            />
            <TextField
              id="user-last-name"
              label="Last Name"
              defaultValue={lastName as unknown as string}
            />
            <TextField
              id="user-email"
              label="Email"
              defaultValue={email as unknown as string}
            />
            <TextField
              id="user-date-of-birth"
              label="Date of Birth"
              defaultValue={lDateOfBirth}
            />
            <Button onClick={handelEditMode}>Save changes</Button>
          </Stack>
        )}
      </Box>
    );
  }

  return <Box sx={{ width: "100%" }}>Empty Profile</Box>;
}