import "./styles/App.css";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { Navigation } from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import { setupStore } from "./store";
import "./commercetools-sdk/ctpClient-example";
import { Container, ThemeProvider } from "@mui/material";
import { Theme } from "./components/Theme";
import { RegistrationPage } from "./pages/RegistrationPage";

const store = setupStore();
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <div className="App">
            <ThemeProvider theme={Theme}>
              {/* навигация для примера */}
              <Navigation />

              {/* пути для примера */}
              <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<RegistrationPage />}></Route>
                <Route path="*" element={<NotFoundPage />}></Route>
              </Routes>
            </ThemeProvider>
          </div>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
