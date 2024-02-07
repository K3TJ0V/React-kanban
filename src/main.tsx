import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterForm from "./RegisterForm.tsx";
import LoginForm from "./LoginForm.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm/>}></Route>
        <Route path="/logged" element={<App/>}></Route>
        <Route path="/signup" element={<RegisterForm/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);




