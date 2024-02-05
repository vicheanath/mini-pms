import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Button } from "react-bootstrap";
const Footer = () => {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
        >
          <svg className="bi" width={30} height={24}>
            <use xlinkHref="#bootstrap" />
          </svg>
        </a>
        <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
      </div>
      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <Button>
            <FiTwitter />
          </Button>
        </li>
        <li className="ms-3">
          <Button>
            <FiInstagram />
          </Button>
        </li>
        <li className="ms-3">
          <Button>
            <FiFacebook />
          </Button>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
