import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const expired = JSON.parse(localStorage.getItem("token") as string)?.exp;
  const currDate = new Date().getTime();
  if (Number(expired) * 1000 - currDate < 0) {
    localStorage.clear();
  }
  const authentication = localStorage.getItem("token");
  if (authentication) {
    return children;
  } else {
    return <Navigate to={"/auth/login"} />;
  }
}
