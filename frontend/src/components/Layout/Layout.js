import React from "react";
import Header from "../Header/Header";
import { Container } from "react-bootstrap";
import {Outlet} from "react-router-dom";
import Footer from "../Footer";
const Layout = ({ children }) => {
  const navLinks = [
    { title: "Rent", path: "/?type=RENT" },
    { title: "Sell", path: "/?type=SELL" },
    { title: "Contact", path: "/contact" },
    { title: "About", path: "/about" },
    { title: "Privacy Policy", path: "/privacy-policy" },
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
