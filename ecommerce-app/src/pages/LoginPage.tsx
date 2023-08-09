import { useEffect } from "react";
import { fetchUserLogin } from "../store/actions/userLoginActions";
import { useAppDispatch } from "../hooks/redux";
import { MyCustomerDraft } from "@commercetools/platform-sdk";

const existingUser: MyCustomerDraft = {
  email: "johndoe@example.com",
  password: "secret123",
  // firstName: "John",
  // lastName: "Doe",
};

export function LoginPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserLogin(existingUser));
  });
  return <div>Login</div>;
}
