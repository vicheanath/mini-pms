import React from "react";
import Header from "../Header/Header";
import { Container } from "react-bootstrap";
import {Outlet} from "react-router-dom";
import Footer from "../Footer";
const Layout = ({ children }) => {
  const navLinks = [
    { title: "Buy", path: "/?type=buy" },
    { title: "Rent", path: "/?type=rent" },
    { title: "Sell", path: "/?type=sell" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Profile", path: "/profile" },
  ];
  return (
    <React.Fragment>
      <Header navLinks={navLinks} />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
