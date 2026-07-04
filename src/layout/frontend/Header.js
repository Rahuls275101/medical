import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
  <React.StrictMode>
   <header id="header_1">
  <div className="header-top-bar d-none d-md-block">
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-8 col-lg-12 col-md-12 col-12 header-contact-layout1">
          <ul>
            <li>
              {" "}
              <i className="fas fa-phone" />
              Call: 123 884400
            </li>
            <li>
              {" "}
              <i className="fas fa-map-marker-alt" />
              59 Street ltd, 59 Newyork City
            </li>
            <li>
              {" "}
              <i className="far fa-envelope-open" />
              info@clinicianleader.com
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
            {" "}
            <img src="img/logo.png" alt="logo" className="img-fluid" />{" "}
          </a>{" "}
        </div>
        <div className="col-lg-7 col-md-7 possition-static">
          <div className="template-main-menu">
            <nav id="dropdown">
              <ul>
                <li>
                  {" "}
                  <a href="#">Home</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Medical Leadership Workshops</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">About Us</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Blog</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Resources</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Faq</a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">Contact</a>{" "}
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-lg-2 col-md-2">
          <div className="header-action-items-layout1">
            <ul>
              <li>
                {" "}
                <a href="#" className="action-items-primary-btn">
                  Login/Register
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