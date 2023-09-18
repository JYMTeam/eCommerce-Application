import React, { useEffect } from "react";
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
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { useSnackbar } from "notistack";
import { hideNotification } from "./store/actions/notificationActions";
import CategoryPage from "./pages/CategoryPage";
import { TokenManager } from "./components/TokenManager";

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

  //notification state
  const { enqueueSnackbar } = useSnackbar();
  const { isNotification, notificationObject } = useAppSelector(
    (state) => state.notification,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const showNotification = () => {
      if (isNotification) {
        enqueueSnackbar(notificationObject.message, {
          variant: notificationObject.type,
          onClose: () => {
            dispatch(hideNotification());
          },
        });
      }
    };
    showNotification();
  }, [dispatch, isNotification, notificationObject, enqueueSnackbar]);

  const routes = [
    { path: "/", element: <MainPage /> },
    {
      path: "/login",
      element: (
        <LoggedIn>
          <LoginPage />
        </LoggedIn>
      ),
    },
    {
      path: "/signup",
      element: (
        <LoggedIn>
          <SignupPage />
        </LoggedIn>
      ),
    },
    {
      path: "/user-profile",
      element: (
        <LoggedOut>
          <UserProfilePage />
        </LoggedOut>
      ),
    },
    { path: "/shop", element: <ShopPage /> },
    { path: "/product/:id", element: <ProductDetailsPage /> },
    { path: "/shop/:id", element: <CategoryPage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "*", element: <NotFoundPage /> },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ padding: { xs: "0 1em" } }}>
        <div className="App">
          <TokenManager />
          <ThemeProvider theme={Theme}>
            <Navigation />
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </ThemeProvider>
        </div>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
