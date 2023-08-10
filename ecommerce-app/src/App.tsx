import "./styles/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/LoginPage";
import { Navigation } from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* навигация для примера */}
        <Navigation />

        {/* пути для примера */}
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
