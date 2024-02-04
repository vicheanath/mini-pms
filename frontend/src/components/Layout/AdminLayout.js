import React from "react";
import Header from "../Header/Header";

const AdminLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default AdminLayout;
