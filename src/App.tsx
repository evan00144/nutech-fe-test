import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthRouting from "./AuthRouting";
import MainLayout from "./MainLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PembelianPage from "./pages/PembelianPage";
import TopUpPage from "./pages/TopUpPage";
import TransactionPage from "./pages/TransactionPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthRouting />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Navigate to={"home"} />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="pembelian/:service_code" element={<PembelianPage />} />
          <Route path="topup" element={<TopUpPage />} />
          <Route path="transaksi" element={<TransactionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
