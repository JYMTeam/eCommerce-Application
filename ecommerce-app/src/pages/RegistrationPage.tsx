import React, { useEffect } from "react";
import { MyCustomerDraft } from "@commercetools/platform-sdk";
import { useAppDispatch } from "../hooks/redux";
import { fetchUserSignup } from "../store/actions/userSignupActions";

const newUser: MyCustomerDraft = {
  email: "draft12@gmail.com",
  password: "Password1",
  firstName: "FirstName",
  lastName: "Last-Name",
  middleName: "Middle Name",
  title: "Title.",
  salutation: "XYm.",
  dateOfBirth: "2018-10-12",
  companyName: "Some Company DDD-333.. 2",
  addresses: [
    {
      country: "UA",
      title: "Dr.",
      salutation: "Mrssd.",
      firstName: "FirstName",
      lastName: "LastName",
      streetName: "BasicStreet",
      streetNumber: "123 A",
      additionalStreetInfo: "by Additional",
      postalCode: "123456 gh",
      city: "Some City",
      region: "Some Region",
      state: "Colorado",
      company: "Some Company-Name ABC1234",
      building: "Green Plaza",
      apartment: "12 Apartment",
      pOBox: "3223vv",
      phone: "2323-445-43",
      mobile: "34305556676867",
      email: "dfd@gmail.com",
      fax: "445 543 43df",
      additionalAddressInfo: "additional Address Info",
    },
    {
      country: "UA",
      title: "Dr.",
      salutation: "Mrssd.",
      firstName: "FirstName1",
      lastName: "LastName1",
      streetName: "BasicStreet1",
      streetNumber: "1223 A",
      additionalStreetInfo: "by Additional1",
      postalCode: "123456 gh1",
      city: "Some City1",
      region: "Some Region1",
      state: "Colorado1",
      company: "Some Company-Name ABC12341",
      building: "Green Plaza1",
      apartment: "12 Apartment1",
      pOBox: "3223vv1",
      phone: "2323-445-431",
      mobile: "343055566768671",
      email: "dfd@gmail.com1",
      fax: "445 543 43df1",
      additionalAddressInfo: "additional Address Info1",
    },
  ],
  defaultShippingAddress: 0,
  defaultBillingAddress: 1,
};

export function RegistrationPage() {
  const dispatch = useAppDispatch();

  // signup
  useEffect(() => {
    dispatch(fetchUserSignup(newUser));
  }, [dispatch]);

  return <div>Registration</div>;
}
