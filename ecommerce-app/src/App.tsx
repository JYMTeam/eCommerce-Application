import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AuthPage } from "./pages/AuthPage";
import { Navigation } from "./components/Navigation";

function App() {
  return (
<div className="App">
  {/* навигация для примера */}
  <Navigation />

  {/* пути для примера */}
  <Routes>
    <Route path="/" element={<MainPage />}></Route>
    <Route path="/auth" element={<AuthPage />}></Route>
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
  );
}

export default App;
