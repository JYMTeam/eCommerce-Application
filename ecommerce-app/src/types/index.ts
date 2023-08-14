export interface IFormInitialValues {
  email: string;
  password: string;
  check?: string[];
}
export interface IRegistrationInitialValues extends IFormInitialValues {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}
