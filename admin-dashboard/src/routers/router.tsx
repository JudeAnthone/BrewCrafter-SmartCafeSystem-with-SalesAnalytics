import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import MenuManager from "@/pages/MenuManager";
import Inventory from "@/pages/Inventory";
import Settings from "@/pages/Settings";
import Register from "@/pages/AdminRegister";
 

export default function AppRouter() {
  return (
    <Router>  {/* Router wrapper */}
      <Routes>
        <Route element={<AdminLayout />}>  {/* layouts routes, all child routes inside will be rendered inside AdminLayout component */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />   
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<MenuManager />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
