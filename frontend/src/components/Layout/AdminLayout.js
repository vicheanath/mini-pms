import React from "react";
import Header from "../Header/Header";
import { Container } from "react-bootstrap";

const AdminLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Container>{children}</Container>
    </React.Fragment>
  );
};

export default AdminLayout;
