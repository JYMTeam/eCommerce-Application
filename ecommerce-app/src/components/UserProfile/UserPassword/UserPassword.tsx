import React, { useEffect } from "react";
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

  const { loginData, errorMessage } = useAppSelector(
    (state) => state.userLogin,
  );

  useEffect(() => {
    if (errorMessage) {
      dispatch(setUserPasswordEdit(true));
    } else {
      dispatch(setUserPasswordEdit(false));
    }
  }, [errorMessage, dispatch]);

  const handleEditMode = () => {
    dispatch(setUserPasswordEdit(!isUserPasswordEdit));
  };

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
        {isUserPasswordEdit && <UpdateUserPasswordForm />}
      </Box>
    );
  }

  return <Box sx={{ width: "100%" }}>Empty Profile</Box>;
};
