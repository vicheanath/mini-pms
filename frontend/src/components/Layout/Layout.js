import React from "react";
import Header from "../Header/Header";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default Layout;
