import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Profile";
import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/Home";
import PropertyDetail from "../pages/PropertyDetail";
import AdminLayout from "../components/Layout/AdminLayout";
import Layout from "../components/Layout/Layout";
import NotFound from "../pages/NotFound";
import Users from "../pages/admin/Users";
import Properties from "../pages/admin/Properties";
import Offers from "../pages/admin/Offers";
import AddProperty from "../pages/AddProperty";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import Favorite from "../pages/Favorite";
import MyProperty from "../pages/MyProperty";
const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="property/:id" element={<PropertyDetail />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="profile" element={<Profile />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="my-properties" element={<MyProperty />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<ChangePassword />} />

      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="properties" element={<Properties />} />
        <Route path="offers" element={<Offers />} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export { Router };
