import React from "react";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Button,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { InfoCard } from "../basic-components/InfoCard/InfoCard";
import { Address } from "@commercetools/platform-sdk";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUserAddressCardEdit } from "../../store/slices/userEditModeSlice";

const EditButtonStyles = {
  zIndex: "1",
  justifyContent: "flex-end",
  ":hover": {
    bgcolor: "transparent",
    color: "primary.dark",
  },
};

export const UserAddressCard = ({
  address,
  id,
  isDefaultShipping,
  isDefaultBilling,
  isBilling,
  isShipping,
}: {
  address: Address;
  id: number;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  isBilling: boolean;
  isShipping: boolean;
}) => {
  const isEdit = useAppSelector(
    (state) => state.userEditMode.userAddressCardEdits[id],
  );
  const dispatch = useAppDispatch();

  const handleEditMode = () => {
    dispatch(setUserAddressCardEdit({ cardId: id, isEdit: !isEdit }));
  };

  const { streetName, city, postalCode, state, country } = address;
  const lCountry = country === "DE" ? "Germany" : "USA";
  return (
    <Box className="personal-info" sx={{ width: "280px" }}>
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
        <Stack spacing={2}>
          <TextField
            id={`user-street-${id}`}
            label="Street"
            defaultValue={streetName || ""}
          />
          <TextField
            id={`user-city-${id}`}
            label="City"
            defaultValue={city || ""}
          />
          <TextField
            id={`user-postal-code-${id}`}
            label="Postal Code"
            defaultValue={postalCode || ""}
          />
          <TextField
            id={`user-state-${id}`}
            label="State"
            defaultValue={state || ""}
          />
          <TextField
            id={`user-country-${id}`}
            label="Country"
            defaultValue={lCountry || ""}
          />
          <Button onClick={handleEditMode}>Save changes</Button>
        </Stack>
      )}
    </Box>
  );
};
