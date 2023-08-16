import "./styles/App.css";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { Navigation } from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { setupStore } from "./store";
import { RegistrationPage } from "./pages/RegistrationPage";

const store = setupStore();

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route
                path="/registration"
                element={<RegistrationPage />}
              ></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </LocalizationProvider>
  );
}

export default App;
