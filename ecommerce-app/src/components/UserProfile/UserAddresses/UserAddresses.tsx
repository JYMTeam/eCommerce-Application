import * as React from "react";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../../hooks/redux";
import { UserAddressCard } from "./UserAddressCard";
import { Address } from "@commercetools/platform-sdk";

const emptyAddress: Address = {
  country: "",
  streetName: "",
  postalCode: "",
  state: "",
  city: "",
};

const emptyAddressFlags = {
  isBilling: false,
  isShipping: false,
  isDefaultBilling: false,
  isDefaultShipping: false,
};

export default function UserAddresses() {
  const { errorMessage, loading, loginData } = useAppSelector(
    (state) => state.userLogin,
  );

  if (loading) {
    return <p className="notification-message">Loading...</p>;
  }

  if (errorMessage) {
    return <p className="notification-message">{errorMessage}</p>;
  }
  if (loginData) {
    const billingIds: string[] | undefined = loginData.billingAddressIds;
    const shippingIds: string[] | undefined = loginData.shippingAddressIds;
    const defaultShippingId: string | undefined =
      loginData.defaultShippingAddressId;
    const defaultBillingId: string | undefined =
      loginData.defaultBillingAddressId;
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px 20px",
        }}
      >
        {loginData.addresses.map((address, index) => {
          const { id } = address;
          const addressFlags = determineAddressFlags(
            id,
            billingIds,
            shippingIds,
            defaultBillingId,
            defaultShippingId,
          );

          return (
            <UserAddressCard
              key={index}
              isNew={false}
              address={address}
              id={index}
              {...addressFlags}
            />
          );
        })}
        <UserAddressCard
          key={loginData.addresses.length}
          isNew={true}
          address={emptyAddress}
          id={loginData.addresses.length}
          {...emptyAddressFlags}
        />
      </Box>
    );
  }

  return <Box sx={{ width: "100%" }}>Empty Profile</Box>;
}

const determineAddressFlags = (
  addressId: string | undefined,
  billingIds: string[] | undefined,
  shippingIds: string[] | undefined,
  defaultBillingId: string | undefined,
  defaultShippingId: string | undefined,
) => {
  const isBilling: boolean = (billingIds || []).includes(addressId || "");
  const isShipping: boolean = (shippingIds || []).includes(addressId || "");
  const isDefaultBilling: boolean = defaultBillingId === (addressId || "");
  const isDefaultShipping: boolean = defaultShippingId === (addressId || "");

  return {
    isBilling,
    isShipping,
    isDefaultBilling,
    isDefaultShipping,
  };
};
