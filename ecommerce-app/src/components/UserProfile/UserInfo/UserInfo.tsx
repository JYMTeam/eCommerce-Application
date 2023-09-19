import * as React from "react";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { InfoCard } from "../../basic-components/InfoCard/InfoCard";
import { formatDateYYYYMMDDToMMDDYYYY } from "../../../utils/utils";
import { UpdateUserInfoForm } from "./UpdateUserInfoForm";
import { setUserInfoEdit } from "../../../store/slices/userEditModeSlice";

const EditButtonStyles = {
  zIndex: "1",
  ":hover": {
    bgcolor: "transparent",
    color: "primary.dark",
  },
};

export default function UserInfo() {
  const isUserInfoEdit = useAppSelector(
    (state) => state.userEditMode.userInfoEdit,
  );
  const dispatch = useAppDispatch();

  const { errorMessage, loading, loginData } = useAppSelector(
    (state) => state.userLogin,
  );
  const handleEditMode = () => {
    dispatch(setUserInfoEdit(!isUserInfoEdit));
  };

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  if (loginData) {
    const { dateOfBirth } = loginData;
    const lDateOfBirth = formatDateYYYYMMDDToMMDDYYYY(dateOfBirth || "");
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
      <Box
        className="personal-info"
        sx={{ width: { xs: "100%", sm: "70%", md: "50%" }, minWidth: "280px" }}
      >
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
            onClick={handleEditMode}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        {!isUserInfoEdit && <InfoCard infoData={userData} />}
        {isUserInfoEdit && (
          <UpdateUserInfoForm
            email={loginData.email}
            firstName={loginData.firstName}
            lastName={loginData.lastName}
            dateOfBirth={loginData.dateOfBirth}
          />
        )}
      </Box>
    );
  }

  return <Box sx={{ width: "100%" }}>Empty Profile</Box>;
}
