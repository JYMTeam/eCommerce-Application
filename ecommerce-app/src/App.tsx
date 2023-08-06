import React from "react";
import logo from "./assets/logo.svg";
import "./styles/App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { LoginPage } from "./pages/AuthPage";
import { Navigation } from "./components/Navigation";
import { Button } from "./components/Button";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* навигация для примера */}
        <Navigation />

        {/* пути для примера */}
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/auth" element={<LoginPage />}></Route>
        </Routes>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Button />
    </BrowserRouter>
  );
}

export default App;
