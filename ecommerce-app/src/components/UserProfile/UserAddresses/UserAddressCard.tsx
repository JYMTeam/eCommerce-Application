import React from "react";
import { Box, IconButton, Tooltip, Chip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { InfoCard } from "../../basic-components/InfoCard/InfoCard";
import { Address } from "@commercetools/platform-sdk";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUserAddressCardEdit } from "../../../store/slices/userEditModeSlice";
import { UpdateUserAddressCardForm } from "./UpdateUserAddressCardForm";
import { fetchDeleteUserAddress } from "../../../store/actions/userActions/userUpdateActions";

const EditButtonStyles = {
  zIndex: "1",
  marginBottom: "10px",
  justifyContent: "flex-end",
  ":hover": {
    bgcolor: "transparent",
    color: "primary.dark",
  },
};

export const UserAddressCard = ({
  address,
  id,
  isNew,
  isDefaultShipping,
  isDefaultBilling,
  isBilling,
  isShipping,
}: {
  address: Address;
  id: number;
  isNew: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  isBilling: boolean;
  isShipping: boolean;
}) => {
  const isEdit = useAppSelector(
    (state) => state.userEditMode.userAddressCardEdits[id],
  );
  const { loginData } = useAppSelector((state) => state.userLogin);
  const dispatch = useAppDispatch();

  const handleEditMode = () => {
    dispatch(setUserAddressCardEdit({ cardId: id, isEdit: !isEdit }));
  };

  const handleDelete = () => {
    if (loginData) {
      dispatch(fetchDeleteUserAddress(loginData, id));
    }
  };

  const { streetName, city, postalCode, state, country } = address;
  let lCountry = "";
  if (country) {
    lCountry = country === "DE" ? "Germany" : "USA";
  }
  return (
    <Box
      className="personal-info"
      sx={{
        width: { xs: "100%", sm: "calc(50% - 20px)", md: "300px" },
        minWidth: "280px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "absolute",
          top: 56,
          right: 16,
        }}
      >
        {!isEdit && !isNew && (
          <Tooltip className="address-info__edit" title="Remove">
            <IconButton
              color="primary"
              aria-label="remove mode"
              sx={EditButtonStyles}
              onClick={handleDelete}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip className="address-info__edit" title="Edit mode">
          <IconButton
            color="primary"
            aria-label="edit mode"
            sx={EditButtonStyles}
            onClick={handleEditMode}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography
        sx={{
          display: "block",
          marginBottom: "14px",
          minHeight: "32px",
          textAlign: "center",
        }}
        variant="subtitle1"
        component="p"
      >
        {isNew && "Add new address"}
      </Typography>
      {!isEdit && (
        <>
          <InfoCard
            infoData={[
              { label: "Street", value: streetName || "" },
              { label: "City", value: city || "" },
              { label: "Postal Code", value: postalCode || "" },
              { label: "State", value: state || "" },
              { label: "Country", value: lCountry || "" },
            ]}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {isDefaultShipping && <Chip label="Default Shipping" />}
            {isDefaultBilling && <Chip label="Default Billing" />}
            {isShipping && <Chip label="Shipping" />}
            {isBilling && <Chip label="Billing" />}
          </Box>
        </>
      )}
      {isEdit && (
        <UpdateUserAddressCardForm
          isNew={isNew}
          addressArrIndex={id}
          streetName={streetName || ""}
          city={city || ""}
          state={state || ""}
          country={country || ""}
          postalCode={postalCode || ""}
          isDefaultBilling={isDefaultBilling}
          isDefaultShipping={isDefaultShipping}
          isBilling={isBilling}
          isShipping={isShipping}
        />
      )}
    </Box>
  );
};
