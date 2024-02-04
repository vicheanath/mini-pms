import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Header = () => {
  const navLinks = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Profile", path: "/profile" },
  ];

  const { pathname } = useLocation();
  console.log(pathname);
  const isActive = (path) => {
    return "/" + path === pathname ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand">BMS</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            {navLinks.map((link, index) => (
              <li className="nav-item">
                <Link className={`nav-link ${isActive}`} to={link.path}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Search"
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
