import { useEffect } from "react";
import { fetchUserLogin } from "../store/actions/userLoginActions";
import { useAppDispatch } from "../hooks/redux";
import { UserAuthOptions } from "@commercetools/sdk-client-v2";

const existingUser: UserAuthOptions = {
  username: "johndoe@example.com",
  password: "secret123",
  // firstName: "John",
  // lastName: "Doe",
};

export function LoginPage() {
  const dispatch = useAppDispatch();

  //получаем данные из стейта
  // const { error, loading, loginData } = useAppSelector(
  //   (state) => state.userLogin,
  // );

  useEffect(() => {
    dispatch(fetchUserLogin(existingUser));
  });
  return (
    <div>
      {/* {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      Customer = {loginData?.customer.email} is login! */}
    </div>
  );
}
