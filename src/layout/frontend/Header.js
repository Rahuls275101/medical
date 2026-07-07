import React from "react";
import { Link } from 'react-router-dom';
import { baseUrl } from '../../config';
import logo from '../../images/logo.png';

function Header() {
  return (
  <React.StrictMode>
   <header id="header_1">
  <div className="header-top-bar d-none d-md-block">
    <div className="container-fluid">
      <div className="row" style={{ alignItems: 'center', }}>
        <div className="col-xl-8 col-lg-12 col-md-12 col-12 header-contact-layout1">
          <ul>
            <li>
              {" "}
              <i className="fas fa-phone" />
              Call: +91 9876543210
            </li>
            <li>
              {" "}
              <i className="fas fa-map-marker-alt" />
              59 Street, 1200 Techpark
            </li>
            <li>
              {" "}
              <i className="far fa-envelope-open" />
              info@predyxiq.com
            </li>
          </ul>
        </div>
        <div className="col-xl-4 d-none d-xl-block">
          <ul className="header-social-layout1">
            <li>
              {" "}
              <a href="#">
                {" "}
                <i className="fab fa-facebook-f" />{" "}
              </a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">
                {" "}
                <i className="fab fa-linkedin-in" />{" "}
              </a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">
                {" "}
                <i className="fab fa-pinterest" />{" "}
              </a>{" "}
            </li>
            <li>
              {" "}
              <a href="#">
                {" "}
                <i className="fab fa-skype" />{" "}
              </a>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className="header-menu-area header-menu-layout1">
    <div className="container-fluid">
      <div className="row no-gutters d-flex align-items-center">
        <div className="col-lg-3 col-md-3 logo-area-layout1">
          {" "}
          <a href="index-2.html" className="temp-logo">
            
            <img
  src={logo}
  alt="AdminLTE Logo"
  className=""
  style={{ opacity: 0.8 }}
/>
          </a>
        </div>
        <div className="col-lg-6 col-md-6 possition-static">
          <div className="template-main-menu">
            <nav id="dropdown">
              <ul>
                <li>
                   <Link to={baseUrl + '/'}>Home</Link>
                </li>
                <li>
                <Link to={baseUrl + '/'}>Predyx IQ Quick</Link>
                </li>
                <li>
                <Link to={baseUrl + '/'}>Predyx IQ </Link>
                </li>
                <li>
                <Link to={baseUrl + '/about'}>About Us</Link>
                </li>
                <li>
                <Link to={baseUrl + '/contact'}>Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-lg-3 col-md-3">
          <div className="header-action-items-layout1">
            <ul>
              <li>
                {" "}
                <a href="#" className="action-items-primary-btn">
                  Request a Demo
                  <i className="fas fa-chevron-right" />
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

 
 </React.StrictMode>

  );
}

export default Header;