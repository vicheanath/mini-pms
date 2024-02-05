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
const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="property/:id" element={<PropertyDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
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
