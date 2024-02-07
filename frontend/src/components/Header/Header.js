import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiDatabase, FiPlus } from "react-icons/fi";
import Login from "../Login";
import {
  closeLoginModal,
  openLoginModal,
  openRegisterModal,
  closeRegisterModal,
} from "../../features/uiSlice";
import Register from "../Register";
import { logout } from "../../features/authSlice";

const Header = ({ navLinks }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const isAdmin = user?.roles
    .map((role) => role.role === "Admin")
    .includes(true);
  const isOwner = user?.roles
    .map((role) => role.role === "Owner")
    .includes(true);
  const isCustomer = user?.roles
    .map((role) => role.role === "Customer")
    .includes(true);

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
          PMS
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
          <div className="d-flex gap-3">
            {isAdmin && (
              <Button variant="outline-light" href="/admin/dashboard">
                <FiDatabase /> Admin
              </Button>
            )}
            {isOwner && (
              <Button variant="outline-light" href="/add-property">
                <FiPlus /> Add Property
              </Button>
            )}

            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <FiUser /> {user?.email}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  {isOwner && <Dropdown.Item href="/my-properties">My Properties</Dropdown.Item>}
                  <Dropdown.Item href="/favorite">Favorite</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      dispatch(logout());
                      localStorage.clear();
                      window.location.reload();
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
      </div>
    </nav>
  );
};

export default Header;
