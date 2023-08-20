import { IFormInitialValues, ISignupInitialValues } from "../types";
import { CustomerDraft } from "@commercetools/platform-sdk";
import {
  subtractYears,
  convertToUserAuthOptions,
  convertToCustomerDraft,
} from "./utils";

describe("subtractYears function", () => {
  it("subtracts years from date", () => {
    const subtractedYear = subtractYears(new Date("2023-02-06T00:00:00"), 23);
    expect(subtractedYear).toEqual(new Date("2000-02-06T00:00:00"));
  });
});

describe("convertToUserAuthOptions", () => {
  it("should convert form values to user auth options", () => {
    const formValues: IFormInitialValues = {
      email: "test@example.com",
      password: "password",
    };

    const expectedUserAuthOptions = {
      username: formValues.email,
      password: formValues.password,
    };

    const userAuthOptions = convertToUserAuthOptions(formValues);
    expect(userAuthOptions).toEqual(expectedUserAuthOptions);
  });
});

describe("convertToCustomerDraft", () => {
  it("should convert form values to a valid customer draft with common address and default shipping", () => {
    const formValues: ISignupInitialValues = {
      email: "test@example.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1998-01-01",
      streetNameShipping: "123 Shipping St",
      streetNameBilling: "456 Billing St",
      cityShipping: "Shipping City",
      cityBilling: "Billing City",
      countryShipping: "Shipping Country",
      countryBilling: "Billing Country",
      postalCodeShipping: "12345",
      postalCodeBilling: "67890",
      commonAddressCheck: [""],
      defaultShippingCheck: ["on"],
      defaultBillingCheck: ["on"],
    };

    const expectedCustomerDraft: CustomerDraft = {
      email: formValues.email,
      password: formValues.password,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      dateOfBirth: formValues.dateOfBirth,
      addresses: [
        {
          country: formValues.countryShipping,
          city: formValues.cityShipping,
          streetName: formValues.streetNameShipping,
          postalCode: formValues.postalCodeShipping,
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [0],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    };

    const customerDraft = convertToCustomerDraft(formValues);
    expect(customerDraft).toEqual(expectedCustomerDraft);
  });
});
