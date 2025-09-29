// AppRoutes

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Craft from "./pages/Craft";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import SocialAuth from "./pages/SocialAuth";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        
        <Routes>
          {/* Public Routes => not logged users*/}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/social-auth" element={<SocialAuth />} />

            {/* Protected Routes => for logged in users*/}
            <Route element={<ProtectedRoute />}>
              <Route path="/menu" element={<Menu />} />
              <Route path="/craft" element={<Craft />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-history" element={<OrderHistory />} />
            </Route>
          </Route>

          {/* Catch all - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;

