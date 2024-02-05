import React from "react";
import Header from "../Header/Header";
import { Container } from "react-bootstrap";
import {Outlet} from "react-router-dom";
const Layout = ({ children }) => {
  const navLinks = [
    { title: "Buy", path: "/buy" },
    { title: "Rent", path: "/rent" },
    { title: "Sell", path: "/sell" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Profile", path: "/profile" },
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

export default Layout;
