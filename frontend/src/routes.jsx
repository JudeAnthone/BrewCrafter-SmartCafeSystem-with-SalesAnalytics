// we can also add the Protected routes for Authentication.
// the user can't access the cart page if he is not logged in.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Craft from "./pages/Craft";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

const AppRoutes = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/craft" element={<Craft />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </MainLayout>
  </Router>
);

export default AppRoutes;

