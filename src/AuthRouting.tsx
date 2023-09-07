import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AuthLayout from "./AuthLayout";
import RegisterPage from "./pages/RegisterPage";

export default function AuthRouting() {
  return (
    <Routes>
      <Route path="" element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}
