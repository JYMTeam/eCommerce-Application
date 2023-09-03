import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ShopPage } from "./pages/ShopPage";
import { CartPage } from "./pages/CartPage";
import { Navigation } from "./components/Navigaton/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import { SignupPage } from "./pages/SignupPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container, ThemeProvider } from "@mui/material";
import { Theme } from "./components/Theme";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchLoginWithToken } from "./store/actions/userLoginActions";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { useSnackbar } from "notistack";
import { hideNotification } from "./store/actions/notificationActions";

function App() {
  type MyComponentProps = React.PropsWithChildren<{}>;
  const LoggedIn = ({ children }: MyComponentProps) => {
    const { isLogged } = useAppSelector((state) => state.userLogin);
    if (isLogged) {
      return <Navigate to="/" replace={true} />;
    }
    return <>{children}</>;
  };

  const LoggedOut = ({ children }: MyComponentProps) => {
    const { isLogged } = useAppSelector((state) => state.userLogin);
    if (!isLogged) {
      return <Navigate to="/" replace={true} />;
    }
    return <>{children}</>;
  };

  //check token after loading
  const [isTokenVerified, setTokenVerified] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { tokenData } = useAppSelector((state) => state.userLogin);
  const { isNotification, notificationObject } = useAppSelector(
    (state) => state.notification,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    const tokenVerification = () => {
      if (!isTokenVerified && tokenData && tokenData?.token !== "") {
        dispatch(fetchLoginWithToken(tokenData));
        setTokenVerified(true);
      }
    };
    tokenVerification();

    if (isNotification) {
      console.log("success notification");
      enqueueSnackbar(notificationObject.message, {
        variant: notificationObject.type,
      });
      dispatch(hideNotification());
    }
  }, [
    dispatch,
    tokenData,
    isTokenVerified,
    isNotification,
    notificationObject,
    enqueueSnackbar,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg">
        <div className="App">
          <ThemeProvider theme={Theme}>
            <Navigation />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route
                path="/login"
                element={
                  <LoggedIn>
                    <LoginPage />
                  </LoggedIn>
                }
              />
              <Route
                path="/signup"
                element={
                  <LoggedIn>
                    <SignupPage />
                  </LoggedIn>
                }
              />
              <Route
                path="/user-profile"
                element={
                  <LoggedOut>
                    <UserProfilePage />
                  </LoggedOut>
                }
              />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ThemeProvider>
        </div>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
