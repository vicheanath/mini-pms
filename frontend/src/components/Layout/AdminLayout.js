import React from "react";
import Header from "../Header/Header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const navLinks = [
    { title: "Dashboard", path: "/admin/dashboard" },
    { title: "Properties", path: "/admin/properties" },
    { title: "Users", path: "/admin/users" },
    { title: "Offers", path: "/admin/offers" },
  ];
  return (
    <React.Fragment>
      <Header navLinks={navLinks} />
      <Container>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default AdminLayout;
