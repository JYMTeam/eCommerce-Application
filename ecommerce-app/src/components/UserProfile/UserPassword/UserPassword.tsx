import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IconButton, Tooltip, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { InfoCard } from "../../basic-components/InfoCard/InfoCard";
import { setUserPasswordEdit } from "../../../store/slices/userEditModeSlice";
import { UpdateUserPasswordForm } from "./UpdateUserPasswordForm";

const EditButtonSx = {
  zIndex: "1",
  ":hover": {
    bgcolor: "transparent",
    color: "primary.dark",
  },
};
export const UserPassword = () => {
  const isUserPasswordEdit = useAppSelector(
    (state) => state.userEditMode.userPasswordEdit,
  );
  const dispatch = useAppDispatch();

  const { errorMessage, loading, loginData } = useAppSelector(
    (state) => state.userLogin,
  );
  const handleEditMode = () => {
    dispatch(setUserPasswordEdit(!isUserPasswordEdit));
  };

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  if (loginData) {
    const userData = [{ label: "Change Password", value: "" }];
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
            sx={EditButtonSx}
            onClick={handleEditMode}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        {!isUserPasswordEdit && <InfoCard infoData={userData} />}
        {isUserPasswordEdit && (
          <UpdateUserPasswordForm />
          // <UpdateUserInfoForm
          //   email={loginData.email}
          //   firstName={loginData.firstName}
          //   lastName={loginData.lastName}
          //   dateOfBirth={loginData.dateOfBirth}
          // />
        )}
      </Box>
    );
  }

  return <Box sx={{ width: "100%" }}>Empty Profile</Box>;
};
