import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import Login from "../Login";
import {
  closeLoginModal,
  openLoginModal,
  openRegisterModal,
  closeRegisterModal,
} from "../../features/uiSlice";
import Register from "../Register";
import { logout } from "../../features/authSlice";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navLinks = [
    { title: "Buy", path: "/buy" },
    { title: "Rent", path: "/rent" },
    { title: "Sell", path: "/sell" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Profile", path: "/profile" },
  ];

  const { pathname } = useLocation();
  const isActive = (path) => {
    return "/" + path === pathname ? "active" : "";
  };
  const dispatch = useDispatch();
  const { isLoginModalOpen, isRegisterModalOpen } = useSelector(
    (state) => state.ui
  );

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BMS
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link className={`nav-link ${isActive}`} to={link.path}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <FiUser />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/change-password">
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    dispatch(logout());
                    localStorage.clear();
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex gap-3">
              <Button
                variant="outline-light"
                onClick={() => dispatch(openLoginModal())}
              >
                Login
              </Button>
              <Button
                variant="outline-light"
                onClick={() => dispatch(openRegisterModal())}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
      <Register
        show={isRegisterModalOpen}
        handleClose={() => dispatch(closeRegisterModal())}
      />
      <Login
        show={isLoginModalOpen}
        handleClose={() => dispatch(closeLoginModal())}
      />
    </nav>
  );
};

export default Header;
