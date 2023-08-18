import "./styles/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import { useAppSelector } from "./hooks/redux";

function App() {
  const { isLogged } = useAppSelector((state) => state.userLogin);
  console.log(isLogged);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <div className="App">
            <ThemeProvider theme={Theme}>
              <Navigation />
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignupPage />}></Route>
                <Route path="/shop" element={<ShopPage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
              </Routes>
            </ThemeProvider>
          </div>
        </Container>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
